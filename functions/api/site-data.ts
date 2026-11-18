import {
  FunctionContext,
  SITE_DATA_KEY,
  getKv,
  jsonResponse,
  methodNotAllowedResponse,
  optionsResponse,
  sanitizePublicSiteData,
  verifyBearerToken,
} from './_shared';

const PUBLIC_CACHE = { 'Cache-Control': 'no-cache, must-revalidate' };
const NO_STORE = { 'Cache-Control': 'no-store' };

export async function onRequest(context: FunctionContext): Promise<Response> {
  const method = context.request.method.toUpperCase();
  if (method === 'OPTIONS') return optionsResponse();

  if (method === 'GET') {
    try {
      const kv = getKv(context.env);
      if (kv) {
        const data = await kv.get<Record<string, unknown>>(SITE_DATA_KEY, 'json');
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          return jsonResponse(sanitizePublicSiteData(data), 200, PUBLIC_CACHE);
        }
      }
      return jsonResponse(null, 200, PUBLIC_CACHE);
    } catch {
      return jsonResponse({ error: 'Failed to load site data.' }, 500, NO_STORE);
    }
  }

  if (method === 'POST') {
    const auth = await verifyBearerToken(context.request, context.env);
    if (!auth.valid) {
      return jsonResponse(
        { success: false, persistedToCloud: false, error: 'Unauthorized' },
        401,
        NO_STORE
      );
    }

    let raw: unknown;
    try {
      raw = await context.request.json();
    } catch {
      return jsonResponse(
        { success: false, persistedToCloud: false, error: 'Invalid site data.' },
        400,
        NO_STORE
      );
    }

    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      return jsonResponse(
        { success: false, persistedToCloud: false, error: 'Invalid site data.' },
        400,
        NO_STORE
      );
    }

    const sanitized = sanitizePublicSiteData(raw as Record<string, unknown>);
    const kv = getKv(context.env);
    if (kv) {
      try {
        await kv.put(SITE_DATA_KEY, JSON.stringify(sanitized));
        return jsonResponse({ success: true, persistedToCloud: true }, 200, NO_STORE);
      } catch {
        return jsonResponse(
          { success: false, persistedToCloud: false, error: 'Failed to persist site data.' },
          500,
          NO_STORE
        );
      }
    }

    return jsonResponse({ success: true, persistedToCloud: false }, 200, NO_STORE);
  }

  return methodNotAllowedResponse('GET, POST, OPTIONS');
}
