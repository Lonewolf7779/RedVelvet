import uuid
from datetime import UTC, datetime
from typing import Any

from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from starlette.responses import JSONResponse


def get_trace_id(request: Request) -> str:
    return getattr(request.state, "trace_id", str(uuid.uuid4()))


def create_error_response(
    status_code: int,
    title: str,
    detail: str,
    instance: str,
    code: str,
    trace_id: str,
    errors: Any = None,
) -> JSONResponse:
    payload: dict[str, Any] = {
        "type": f"https://redvelvet.luxury/errors/{code.lower().replace('_', '-')}",
        "title": title,
        "status": status_code,
        "detail": detail,
        "instance": instance,
        "code": code,
        "trace_id": trace_id,
        "timestamp": datetime.now(UTC).isoformat(),
    }
    if errors:
        payload["errors"] = errors
    return JSONResponse(status_code=status_code, content=payload)


def register_error_handlers(app: FastAPI) -> None:
    @app.exception_handler(StarletteHTTPException)
    async def http_exception_handler(request: Request, exc: StarletteHTTPException) -> JSONResponse:
        trace_id = get_trace_id(request)
        code = f"HTTP_{exc.status_code}"
        return create_error_response(
            status_code=exc.status_code,
            title="HTTP Error",
            detail=str(exc.detail),
            instance=str(request.url.path),
            code=code,
            trace_id=trace_id,
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(
        request: Request, exc: RequestValidationError
    ) -> JSONResponse:
        trace_id = get_trace_id(request)
        formatted_errors = [
            {"field": " -> ".join(str(loc) for loc in err["loc"]), "issue": err["msg"]}
            for err in exc.errors()
        ]
        return create_error_response(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            title="Validation Error",
            detail="The incoming request payload failed schema validation",
            instance=str(request.url.path),
            code="VALIDATION_FAILED",
            trace_id=trace_id,
            errors=formatted_errors,
        )

    @app.exception_handler(Exception)
    async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
        trace_id = get_trace_id(request)
        # Never leak raw stack traces or internal exception details to client
        return create_error_response(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            title="Internal Server Error",
            detail="An unexpected internal server error occurred. Please contact system support with trace_id.",
            instance=str(request.url.path),
            code="INTERNAL_SERVER_ERROR",
            trace_id=trace_id,
        )
