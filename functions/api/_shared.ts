export interface KVNamespaceLike {
  get(key: string, type: 'text'): Promise<string | null>;
  get<T = unknown>(key: string, type: 'json'): Promise<T | null>;
  put(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
}

export interface Env {
  SITE_DATA_KV?: KVNamespaceLike;
  SITE_DATA?: KVNamespaceLike;
  AUTH_SECRET?: string;
}

export interface FunctionContext {
  request: Request;
  env: Env;
}

export const SITE_DATA_KEY = 'kenry_interiors_site_data';
export const AUTH_HASH_KEY = 'admin_auth_hash';
export const SIGNING_SECRET_KEY = 'admin_signing_secret';
export const DEFAULT_STARTER_HASH =
  'bee111eca90c948fa76c0147870d9d6e44c7a589a6805292637e9537f941292e';
export const TOKEN_TTL_SECONDS = 28800;

export const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export function getKv(env?: Env): KVNamespaceLike | null {
  return env?.SITE_DATA_KV || env?.SITE_DATA || null;
}

export function jsonResponse(body: unknown, status = 200, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json', ...extraHeaders },
  });
}

export function optionsResponse(): Response {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export function methodNotAllowedResponse(allow: string): Response {
  return jsonResponse({ error: 'Method not allowed.' }, 405, { Allow: allow, 'Cache-Control': 'no-store' });
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return bytesToHex(new Uint8Array(digest));
}

export function timingSafeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  let diff = ab.length ^ bb.length;
  const maxLen = Math.max(ab.length, bb.length);
  for (let i = 0; i < maxLen; i += 1) diff |= (ab[i] ?? 0) ^ (bb[i] ?? 0);
  return diff === 0;
}

export async function hashPassword(password: string): Promise<string> {
  const saltBytes = new Uint8Array(16);
  crypto.getRandomValues(saltBytes);
  const salt = bytesToHex(saltBytes);
  return `sha256$${salt}$${await sha256Hex(`${salt}:${password}`)}`;
}

export async function verifyPassword(password: string, storedHash: string | null): Promise<boolean> {
  if (typeof password !== 'string' || password.length === 0) return false;
  const target = storedHash && storedHash.trim().length > 0 ? storedHash.trim() : DEFAULT_STARTER_HASH;
  if (target.startsWith('sha256$')) {
    const parts = target.split('$');
    if (parts.length !== 3 || !parts[1] || !parts[2]) return false;
    return timingSafeEqual(await sha256Hex(`${parts[1]}:${password}`), parts[2]);
  }
  return timingSafeEqual(await sha256Hex(password), target);
}

export function toBase64Url(bytes: Uint8Array): string {
  let bin = '';
  for (let i = 0; i < bytes.length; i += 1) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function fromBase64Url(input: string): Uint8Array<ArrayBuffer> | null {
  if (!/^[A-Za-z0-9_-]+$/.test(input)) return null;
  const padded = input.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((input.length + 3) % 4);
  try {
    const bin = atob(padded);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
    return out;
  } catch {
    return null;
  }
}

export async function resolveSigningSecret(env: Env, allowCreate: boolean): Promise<string | null> {
  const envSecret = env?.AUTH_SECRET?.trim();
  if (envSecret) return envSecret;
  const kv = getKv(env);
  if (!kv) return null;
  const existing = await kv.get(SIGNING_SECRET_KEY, 'text');
  if (existing && existing.trim()) return existing.trim();
  if (!allowCreate) return null;
  const secretBytes = new Uint8Array(32);
  crypto.getRandomValues(secretBytes);
  const created = bytesToHex(secretBytes);
  await kv.put(SIGNING_SECRET_KEY, created);
  return created;
}

async function importHmacKey(secret: string, usage: 'sign' | 'verify'): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [usage]);
}

export async function signSessionToken(secret: string): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + TOKEN_TTL_SECONDS;
  const jtiBytes = new Uint8Array(16);
  crypto.getRandomValues(jtiBytes);
  const payload = { sub: 'admin', iat, exp, jti: bytesToHex(jtiBytes) };
  const payloadB64 = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const key = await importHmacKey(secret, 'sign');
  const sigBuf = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payloadB64));
  return `${payloadB64}.${toBase64Url(new Uint8Array(sigBuf))}`;
}

export async function verifyBearerToken(
  request: Request,
  env: Env
): Promise<{ valid: boolean; error?: string }> {
  const authHeader = request.headers.get('Authorization') || '';
  const match = /^Bearer\s+(\S+)$/i.exec(authHeader.trim());
  if (!match) return { valid: false, error: 'Authorization token required.' };

  const segments = match[1].split('.');
  if (segments.length !== 2 || !segments[0] || !segments[1]) return { valid: false, error: 'Invalid session token.' };

  const payloadBytes = fromBase64Url(segments[0]);
  const sigBytes = fromBase64Url(segments[1]);
  if (!payloadBytes || !sigBytes) return { valid: false, error: 'Invalid session token.' };

  let claims: { sub?: unknown; exp?: unknown };
  try {
    const parsed = JSON.parse(new TextDecoder().decode(payloadBytes));
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return { valid: false, error: 'Invalid session token.' };
    claims = parsed as { sub?: unknown; exp?: unknown };
  } catch {
    return { valid: false, error: 'Invalid session token.' };
  }

  if (claims.sub !== 'admin' || typeof claims.exp !== 'number') return { valid: false, error: 'Invalid session token.' };
  if (claims.exp <= Math.floor(Date.now() / 1000)) return { valid: false, error: 'Session expired. Please sign in again.' };

  const secret = await resolveSigningSecret(env, false);
  if (!secret) return { valid: false, error: 'Invalid session token.' };

  const key = await importHmacKey(secret, 'verify');
  const verified = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(segments[0]));
  return verified ? { valid: true } : { valid: false, error: 'Invalid session token.' };
}

export function sanitizePublicSiteData(raw: Record<string, unknown>): Record<string, unknown> {
  const clean: Record<string, unknown> = { ...raw };
  delete clean.adminPassword;
  delete clean.admin_auth_hash;
  delete clean.admin_signing_secret;
  if (clean.brand && typeof clean.brand === 'object' && !Array.isArray(clean.brand)) {
    const cleanBrand = { ...(clean.brand as Record<string, unknown>) };
    delete cleanBrand.adminPassword;
    delete cleanBrand.admin_auth_hash;
    delete cleanBrand.admin_signing_secret;
    clean.brand = cleanBrand;
  }
  return clean;
}
