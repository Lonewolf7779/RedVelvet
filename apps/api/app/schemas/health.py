from pydantic import BaseModel, Field


class DependencyHealth(BaseModel):
    status: str = Field(
        ..., description="Status of dependency: connected, disconnected, not_configured"
    )
    latency_ms: float | None = Field(None, description="Probe response latency in milliseconds")
    error: str | None = Field(None, description="Diagnostic error details if probe failed")


class HealthStatusResponse(BaseModel):
    status: str = Field(..., description="Overall system health status: ok, degraded, unhealthy")
    version: str = Field(..., description="Application semantic version")
    environment: str = Field(..., description="Operational environment")
    timestamp: str = Field(..., description="ISO 8601 UTC timestamp")
    dependencies: dict[str, DependencyHealth] = Field(..., description="Subsystem health probes")


class LiveHealthResponse(BaseModel):
    status: str = Field("ok", description="Liveness probe status")


class ReadyHealthResponse(BaseModel):
    status: str = Field(..., description="Readiness status: ready or not_ready")
    database: str = Field(..., description="Database connectivity")
    redis: str = Field(..., description="Redis connectivity")
