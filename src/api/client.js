// Error thrown by apiGet and apiPost. Carries what the page needs to explain the failure.
export class ApiError extends Error {
  constructor(message, { status = null, code = null, refCode = null } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.refCode = refCode;
  }
}

// Shown when the request never reached Express (API down, proxy error, no network).
const UNREACHABLE_MESSAGE =
  "Mohon maaf, server tidak dapat dihubungi. Silakan coba beberapa saat lagi.";

// Called when the API answer 401 auth.session_required. Set by AuthProvider.
let sessionExpiredHandler = null;

// AuthProvider registers its handler here; null removes it.
export function setSessionExpiredHandler(handler) {
  sessionExpiredHandler = handler;
}

// Sends one request and returns body.data, or throws ApiError.
// An aborted request is rethrown untouched so the caller can ignore it.
async function request(path, options) {
  let response;
  try {
    response = await fetch(path, options);
  } catch (error) {
    if (error.name === "AbortError") {
      throw error;
    }
    throw new ApiError(UNREACHABLE_MESSAGE);
  }
  const body = await response.json().catch(() => null);
  if (body === null) {
    throw new ApiError(UNREACHABLE_MESSAGE, { status: response.status });
  }
  if (!body.success) {
    if (
      response.status === 401 &&
      body.error?.code === "auth.session_required" &&
      sessionExpiredHandler
    ) {
      sessionExpiredHandler();
    }
    throw new ApiError(body.message, {
      status: response.status,
      code: body.error?.code,
      refCode: body.error?.ref_code,
    });
  }
  return body.data;
}

// GETs a JSON edpoint.
export function apiGet(path, { signal } = {}) {
  return request(path, { signal });
}
// POSTs a JSON body. Sends an empty object when there is no data.
export function apiPost(path, data = {}) {
  return request(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
