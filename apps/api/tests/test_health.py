from unittest.mock import patch

import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_health_liveness(client: AsyncClient):
    """Test /api/v1/health/live returns HTTP 200 with ok status."""
    response = await client.get("/api/v1/health/live")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"


@pytest.mark.asyncio
async def test_health_ready_healthy(client: AsyncClient):
    """Test /api/v1/health/ready returns HTTP 200 when dependencies report healthy."""
    with (
        patch("app.api.v1.endpoints.health.check_db_health") as mock_db,
        patch("app.api.v1.endpoints.health.check_redis_health") as mock_redis,
    ):
        mock_db.return_value = {"status": "connected", "latency_ms": 1.2}
        mock_redis.return_value = {"status": "connected", "latency_ms": 0.8}

        response = await client.get("/api/v1/health/ready")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ready"
        assert data["database"] == "connected"
        assert data["redis"] == "connected"


@pytest.mark.asyncio
async def test_health_ready_unhealthy(client: AsyncClient):
    """Test /api/v1/health/ready returns HTTP 503 when a dependency fails."""
    with (
        patch("app.api.v1.endpoints.health.check_db_health") as mock_db,
        patch("app.api.v1.endpoints.health.check_redis_health") as mock_redis,
    ):
        mock_db.return_value = {"status": "disconnected", "error": "Connection refused"}
        mock_redis.return_value = {"status": "connected", "latency_ms": 0.5}

        response = await client.get("/api/v1/health/ready")
        assert response.status_code == 503
        data = response.json()
        assert data["status"] == "not_ready"
        assert data["database"] == "disconnected"


@pytest.mark.asyncio
async def test_health_status_telemetry(client: AsyncClient):
    """Test /api/v1/health/status returns complete telemetry schema."""
    with (
        patch("app.api.v1.endpoints.health.check_db_health") as mock_db,
        patch("app.api.v1.endpoints.health.check_redis_health") as mock_redis,
    ):
        mock_db.return_value = {"status": "connected", "latency_ms": 2.1}
        mock_redis.return_value = {"status": "connected", "latency_ms": 1.4}

        response = await client.get("/api/v1/health/status")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"
        assert "version" in data
        assert "timestamp" in data
        assert "dependencies" in data
        assert data["dependencies"]["database"]["latency_ms"] == 2.1
        assert data["dependencies"]["redis"]["latency_ms"] == 1.4
