from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import root_api_router
from app.core.config import settings
from app.core.errors import register_error_handlers
from app.core.logging import logger, setup_logging
from app.core.security import RequestSizeLimiterMiddleware, SecurityHeadersMiddleware
from app.db.session import close_db
from app.redis.client import close_redis


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """
    Manage lifecycle events cleanly: safe startup validation and graceful resource shutdown.
    """
    setup_logging(settings.LOG_LEVEL)
    logger.info(f"Starting {settings.PROJECT_NAME} in '{settings.ENVIRONMENT}' environment...")

    yield

    logger.info("Initiating graceful shutdown sequence...")
    await close_db()
    await close_redis()
    logger.info("Graceful shutdown completed.")


def create_application() -> FastAPI:
    app = FastAPI(
        title=settings.PROJECT_NAME,
        version="0.1.0",
        description="Project Red Velvet Foundation API - High-fashion editorial architecture and multi-tenant telemetry.",
        openapi_url="/api/v1/openapi.json",
        docs_url="/docs",
        redoc_url="/redoc",
        lifespan=lifespan,
    )

    # 1. Request Size Limiter Middleware (prevents body flooding attacks)
    app.add_middleware(RequestSizeLimiterMiddleware)

    # 2. Security Headers Middleware (OWASP ASVS compliance)
    app.add_middleware(SecurityHeadersMiddleware)

    # 3. Secure CORS Middleware (explicit origins, no wildcards in production)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allow_headers=["Authorization", "Content-Type", "X-Trace-ID", "Accept"],
        max_age=600,
    )

    # 4. Standardized RFC 7807 Error Handlers
    register_error_handlers(app)

    # 5. Root & Versioned API Routers
    app.include_router(root_api_router)

    return app


app = create_application()
