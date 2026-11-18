import {
  AUTH_HASH_KEY,
  FunctionContext,
  getKv,
  jsonResponse,
  methodNotAllowedResponse,
  optionsResponse,
} from './_shared';

export async function onRequest(context: FunctionContext): Promise<Response> {
  const method = context.request.method.toUpperCase();
  if (method === 'OPTIONS') return optionsResponse();
  if (method !== 'GET') return methodNotAllowedResponse('GET, OPTIONS');

  const kv = getKv(context.env);
  let kvConnected = Boolean(kv);
  let authInitialized = false;

  if (kv) {
    try {
      const hash = await kv.get(AUTH_HASH_KEY, 'text');
      authInitialized = Boolean(hash && hash.trim().length > 0);
    } catch {
      kvConnected = false;
      authInitialized = false;
    }
  }

  return jsonResponse(
    { ok: true, kvConnected, authInitialized },
    200,
    { 'Cache-Control': 'no-store' }
  );
}
