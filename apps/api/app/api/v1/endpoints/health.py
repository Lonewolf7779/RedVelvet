from datetime import UTC, datetime

from fastapi import APIRouter, Response, status

from app.core.config import settings
from app.db.session import check_db_health
from app.redis.client import check_redis_health
from app.schemas.health import (
    DependencyHealth,
    HealthStatusResponse,
    LiveHealthResponse,
    ReadyHealthResponse,
)

router = APIRouter(prefix="/health", tags=["System Health & Telemetry"])


@router.get(
    "/live",
    response_model=LiveHealthResponse,
    summary="Kubernetes Liveness Probe",
    description="Confirms that the FastAPI process is active and processing requests.",
)
async def liveness_probe() -> LiveHealthResponse:
    return LiveHealthResponse(status="ok")


@router.get(
    "/ready",
    response_model=ReadyHealthResponse,
    summary="Kubernetes Readiness Probe",
    description="Probes PostgreSQL and Redis connectivity. Returns HTTP 503 if dependencies fail.",
)
async def readiness_probe(response: Response) -> ReadyHealthResponse:
    db_health = await check_db_health()
    redis_health = await check_redis_health()

    is_ready = db_health["status"] == "connected" and redis_health["status"] == "connected"

    if not is_ready:
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE
        return ReadyHealthResponse(
            status="not_ready",
            database=db_health["status"],
            redis=redis_health["status"],
        )

    return ReadyHealthResponse(
        status="ready",
        database="connected",
        redis="connected",
    )


@router.get(
    "/status",
    response_model=HealthStatusResponse,
    summary="Detailed Subsystem Telemetry",
    description="Comprehensive health status report including latency probes for all backend datastores.",
)
async def status_probe() -> HealthStatusResponse:
    db_health = await check_db_health()
    redis_health = await check_redis_health()

    db_ok = db_health["status"] == "connected"
    redis_ok = redis_health["status"] == "connected"

    if db_ok and redis_ok:
        overall = "ok"
    elif db_ok or redis_ok:
        overall = "degraded"
    else:
        overall = "unhealthy"

    return HealthStatusResponse(
        status=overall,
        version="0.1.0",
        environment=settings.ENVIRONMENT,
        timestamp=datetime.now(UTC).isoformat(),
        dependencies={
            "database": DependencyHealth(
                status=db_health["status"],
                latency_ms=db_health.get("latency_ms"),
                error=db_health.get("error"),
            ),
            "redis": DependencyHealth(
                status=redis_health["status"],
                latency_ms=redis_health.get("latency_ms"),
                error=redis_health.get("error"),
            ),
        },
    )
