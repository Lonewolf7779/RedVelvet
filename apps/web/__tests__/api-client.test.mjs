import test from "node:test";
import assert from "node:assert/strict";

class ApiError extends Error {
  constructor(errorResponse) {
    super(errorResponse.detail || errorResponse.title || "Unknown API Error");
    this.name = "ApiError";
    this.status = errorResponse.status;
    this.code = errorResponse.code;
    this.details = errorResponse.errors;
    this.traceId = errorResponse.trace_id;
  }
}

test("ApiError parses RFC 7807 error payload correctly", () => {
  const payload = {
    type: "https://redvelvet.luxury/errors/validation-failed",
    title: "Validation Error",
    status: 422,
    detail: "Field 'title' is required",
    instance: "/api/v1/editorial",
    code: "VALIDATION_FAILED",
    trace_id: "req-trace-12345",
    timestamp: "2026-10-31T00:00:00Z",
    errors: [{ field: "title", issue: "Field cannot be empty" }],
  };

  const err = new ApiError(payload);
  assert.equal(err.name, "ApiError");
  assert.equal(err.status, 422);
  assert.equal(err.code, "VALIDATION_FAILED");
  assert.equal(err.traceId, "req-trace-12345");
  assert.equal(err.details?.length, 1);
  assert.equal(err.message, "Field 'title' is required");
});
