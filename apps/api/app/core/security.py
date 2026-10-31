import uuid
from collections.abc import Callable

from fastapi import Request, Response, status
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse

from app.core.config import settings


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """
    Inject strict HTTP security headers conforming to OWASP ASVS v4.0.3 requirements.
    """

    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        trace_id = request.headers.get("X-Trace-ID", str(uuid.uuid4()))
        request.state.trace_id = trace_id

        response = await call_next(request)

        # Apply OWASP ASVS Recommended Security Headers
        response.headers["X-Trace-ID"] = trace_id
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
        response.headers["Content-Security-Policy"] = (
            "default-src 'none'; frame-ancestors 'none'; base-uri 'none';"
        )
        response.headers["Strict-Transport-Security"] = (
            "max-age=63072000; includeSubDomains; preload"
        )
        response.headers["Cache-Control"] = "no-store, max-age=0"

        return response


class RequestSizeLimiterMiddleware(BaseHTTPMiddleware):
    """
    Prevent HTTP body flooding / resource exhaustion attacks by limiting maximum request size.
    """

    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        content_length = request.headers.get("content-length")
        if content_length:
            try:
                length = int(content_length)
                if length > settings.MAX_REQUEST_SIZE_BYTES:
                    trace_id = getattr(request.state, "trace_id", str(uuid.uuid4()))
                    return JSONResponse(
                        status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                        content={
                            "type": "https://redvelvet.luxury/errors/payload-too-large",
                            "title": "Payload Too Large",
                            "status": 413,
                            "detail": f"Request body exceeds maximum allowed size of {settings.MAX_REQUEST_SIZE_BYTES} bytes",
                            "instance": str(request.url.path),
                            "code": "PAYLOAD_TOO_LARGE",
                            "trace_id": trace_id,
                        },
                    )
            except ValueError:
                pass

        return await call_next(request)
