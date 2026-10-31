"""
System integration tests probing cross-boundary contracts and API endpoints.
"""
import pytest
from httpx import ASGITransport, AsyncClient
import sys
import os

# Ensure apps/api is importable
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../apps/api")))
from app.main import app  # noqa: E402


@pytest.mark.asyncio
async def test_full_api_health_flow():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://testserver"
    ) as client:
        # 1. Probe liveness
        live_res = await client.get("/api/v1/health/live")
        assert live_res.status_code == 200
        assert live_res.json()["status"] == "ok"

        # 2. Probe auth boundary contract
        auth_res = await client.get("/api/v1/auth/boundary")
        assert auth_res.status_code == 200
        assert auth_res.json()["status"] == "SPECIFICATION_ONLY"

        # 3. Probe profiles boundary contract
        profiles_res = await client.get("/api/v1/profiles/boundary")
        assert profiles_res.status_code == 200
        assert profiles_res.json()["status"] == "SPECIFICATION_ONLY"
