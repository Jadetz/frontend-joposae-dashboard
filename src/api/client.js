// Error thrown by apiGet. Carries what the page needs to explain the failure.
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

// GETs a JSON endpoint and returns body.data, or throws ApiError.
// An aborted request is rethrown untouched so the caller can ignore it.
export async function apiGet(path, { signal } = {}) {
  let response;
  try {
    response = await fetch(path, { signal });
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
    throw new ApiError(body.message, {
      status: response.status,
      code: body.error?.code,
      refCode: body.error?.ref_code,
    });
  }
  return body.data;
}
