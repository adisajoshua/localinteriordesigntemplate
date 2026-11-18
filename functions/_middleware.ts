const DOTFILE_PATTERN = /(?:^|\/)\.(?:env|git)(?:$|\/|[^/]*)/i;
const SENSITIVE_EXT_PATTERN = /\.(?:csv|log|bak|tmp|sh|sql)(?:\/|;|#|\0|$)/i;

function forbiddenResponse(): Response {
  return new Response('Forbidden', {
    status: 403,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function isSensitivePath(pathValue: string): boolean {
  return (
    pathValue.includes('\0') ||
    DOTFILE_PATTERN.test(pathValue) ||
    SENSITIVE_EXT_PATTERN.test(pathValue)
  );
}

export async function onRequest(context: {
  request: Request;
  next: () => Promise<Response>;
}): Promise<Response> {
  const rawPathname = new URL(context.request.url).pathname;
  if (isSensitivePath(rawPathname)) {
    return forbiddenResponse();
  }

  let decoded = rawPathname;
  for (let pass = 0; pass < 6; pass += 1) {
    try {
      const nextDecoded = decodeURIComponent(decoded);
      if (nextDecoded === decoded) break;
      decoded = nextDecoded;
    } catch {
      return forbiddenResponse();
    }
    if (isSensitivePath(decoded)) {
      return forbiddenResponse();
    }
  }

  return context.next();
}
