const realFetch = globalThis.fetch;

globalThis.fetch = function patchedFetch(input: RequestInfo | URL, init?: RequestInit) {
  const body = init?.body as unknown;
  const isBinaryBody =
    body != null &&
    (body instanceof Uint8Array || ArrayBuffer.isView(body as ArrayBufferView));

  if (isBinaryBody && init?.headers) {
    const headers = new Headers(init.headers as HeadersInit);
    if (headers.has('content-length')) {
      headers.delete('content-length');
      return realFetch(input, { ...init, headers });
    }
  }
  return realFetch(input, init);
} as typeof fetch;