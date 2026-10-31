import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_not_found_rfc7807_format(client: AsyncClient):
    """Verify 404 response strictly adheres to RFC 7807 problem details."""
    response = await client.get("/api/v1/non-existent-route")
    assert response.status_code == 404
    data = response.json()
    assert "type" in data
    assert "title" in data
    assert data["status"] == 404
    assert "detail" in data
    assert "trace_id" in data
    assert "code" in data
    assert data["code"] == "HTTP_404"


@pytest.mark.asyncio
async def test_trace_id_present_in_error(client: AsyncClient):
    """Verify trace_id header is preserved in error response."""
    custom_trace = "custom-test-trace-id-99"
    response = await client.get("/api/v1/unknown", headers={"X-Trace-ID": custom_trace})
    assert response.headers.get("X-Trace-ID") == custom_trace
    data = response.json()
    assert data["trace_id"] == custom_trace
