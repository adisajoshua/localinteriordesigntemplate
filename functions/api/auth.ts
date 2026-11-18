import {
  AUTH_HASH_KEY,
  FunctionContext,
  getKv,
  hashPassword,
  jsonResponse,
  methodNotAllowedResponse,
  optionsResponse,
  resolveSigningSecret,
  signSessionToken,
  verifyBearerToken,
  verifyPassword,
} from './_shared';

const NO_STORE = { 'Cache-Control': 'no-store' };

export async function onRequest(context: FunctionContext): Promise<Response> {
  const method = context.request.method.toUpperCase();
  if (method === 'OPTIONS') return optionsResponse();
  if (method !== 'POST') return methodNotAllowedResponse('POST, OPTIONS');

  let raw: unknown;
  try {
    raw = await context.request.json();
  } catch {
    return jsonResponse({ error: 'Invalid request body.' }, 400, NO_STORE);
  }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return jsonResponse({ error: 'Invalid request body.' }, 400, NO_STORE);
  }

  const body = raw as Record<string, unknown>;
  const action = typeof body.action === 'string' ? body.action : '';

  try {
    if (action === 'login') {
      const kv = getKv(context.env);
      const hasSecret = Boolean(context.env?.AUTH_SECRET?.trim());
      if (!kv && !hasSecret) {
        return jsonResponse(
          {
            authenticated: false,
            error: 'Cloud storage is not connected yet. Bind SITE_DATA_KV in Cloudflare Pages settings.',
          },
          503,
          NO_STORE
        );
      }

      const password = body.password;
      if (typeof password !== 'string' || password.length === 0) {
        return jsonResponse({ authenticated: false, error: 'Incorrect password.' }, 401, NO_STORE);
      }

      const storedHash = kv ? await kv.get(AUTH_HASH_KEY, 'text') : null;
      if (!(await verifyPassword(password, storedHash))) {
        return jsonResponse({ authenticated: false, error: 'Incorrect password.' }, 401, NO_STORE);
      }

      const signingSecret = await resolveSigningSecret(context.env, true);
      if (!signingSecret) {
        return jsonResponse(
          { authenticated: false, error: 'Authentication signing secret is unavailable.' },
          503,
          NO_STORE
        );
      }

      const token = await signSessionToken(signingSecret);
      return jsonResponse({ authenticated: true, token }, 200, NO_STORE);
    }

    if (action === 'verify') {
      const auth = await verifyBearerToken(context.request, context.env);
      if (!auth.valid) {
        return jsonResponse({ authenticated: false, error: auth.error || 'Unauthorized' }, 401, NO_STORE);
      }
      return jsonResponse({ authenticated: true }, 200, NO_STORE);
    }

    if (action === 'change_password') {
      const auth = await verifyBearerToken(context.request, context.env);
      if (!auth.valid) {
        return jsonResponse({ success: false, error: 'Session expired. Please sign in again.' }, 401, NO_STORE);
      }

      const kv = getKv(context.env);
      if (!kv) {
        return jsonResponse(
          { success: false, error: 'Cloud storage is not connected yet. Bind SITE_DATA_KV to change your password.' },
          503,
          NO_STORE
        );
      }

      const currentPassword = body.currentPassword;
      if (typeof currentPassword !== 'string' || currentPassword.length === 0) {
        return jsonResponse({ success: false, error: 'Current password is incorrect.' }, 403, NO_STORE);
      }

      const storedHash = await kv.get(AUTH_HASH_KEY, 'text');
      if (!(await verifyPassword(currentPassword, storedHash))) {
        return jsonResponse({ success: false, error: 'Current password is incorrect.' }, 403, NO_STORE);
      }

      const newPassword = body.newPassword;
      if (typeof newPassword !== 'string' || newPassword.length < 6) {
        return jsonResponse({ success: false, error: 'New password must be at least 6 characters.' }, 400, NO_STORE);
      }

      await kv.put(AUTH_HASH_KEY, await hashPassword(newPassword));
      return jsonResponse({ success: true }, 200, NO_STORE);
    }

    if (action === 'factory_reset_auth') {
      const auth = await verifyBearerToken(context.request, context.env);
      if (!auth.valid) {
        return jsonResponse({ success: false, error: 'Session expired. Please sign in again.' }, 401, NO_STORE);
      }

      const kv = getKv(context.env);
      if (!kv) {
        return jsonResponse({ success: false, error: 'Cloud storage is not connected yet.' }, 503, NO_STORE);
      }

      await kv.delete(AUTH_HASH_KEY);
      return jsonResponse({ success: true, authInitialized: false }, 200, NO_STORE);
    }

    return jsonResponse({ error: 'Unsupported action.' }, 400, NO_STORE);
  } catch {
    return jsonResponse({ error: 'Authentication service error.' }, 500, NO_STORE);
  }
}
