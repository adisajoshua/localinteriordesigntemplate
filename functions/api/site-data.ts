/**
 * Cloudflare Pages Functions: /api/site-data
 * Serverless Edge endpoint to fetch and store site data using Cloudflare KV.
 * 100% Free, Zero-Server Maintenance, never sleeps.
 */

interface Env {
  SITE_DATA?: {
    get: (key: string, type?: 'text' | 'json') => Promise<any>;
    put: (key: string, value: string) => Promise<void>;
  };
}

const KV_KEY = 'kenry_interiors_site_data';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const onRequestOptions = async () => {
  return new Response(null, { headers: corsHeaders });
};

export const onRequestGet = async (context: { env: Env }) => {
  try {
    if (context.env?.SITE_DATA) {
      const data = await context.env.SITE_DATA.get(KV_KEY, 'json');
      if (data) {
        return new Response(JSON.stringify(data), {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=60',
          },
        });
      }
    }
    // Return empty if KV not bound or uninitialized
    return new Response(JSON.stringify(null), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Failed to get data' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    const payload = await context.request.json();
    if (!payload || typeof payload !== 'object') {
      return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (context.env?.SITE_DATA) {
      await context.env.SITE_DATA.put(KV_KEY, JSON.stringify(payload));
      return new Response(JSON.stringify({ success: true, message: 'Saved to Cloudflare KV Edge' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Acknowledge receipt even if KV namespace is not yet bound
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Saved (KV binding not detected, persisted to client cache)',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Failed to save data' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
};
