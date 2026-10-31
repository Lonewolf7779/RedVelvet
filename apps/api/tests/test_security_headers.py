import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_security_headers_present(client: AsyncClient):
    """Verify OWASP ASVS security headers are present on API responses."""
    response = await client.get("/api/v1/health/live")
    assert response.status_code == 200

    headers = response.headers
    assert headers.get("X-Frame-Options") == "DENY"
    assert headers.get("X-Content-Type-Options") == "nosniff"
    assert headers.get("Referrer-Policy") == "strict-origin-when-cross-origin"
    assert "Strict-Transport-Security" in headers
    assert "Permissions-Policy" in headers
    assert "Content-Security-Policy" in headers
    assert "X-Trace-ID" in headers


@pytest.mark.asyncio
async def test_payload_too_large_enforced(client: AsyncClient):
    """Verify request size limiter middleware rejects oversized content-length."""
    # Simulate a request header exceeding 10MB
    oversized_length = str(20 * 1024 * 1024)
    response = await client.post(
        "/api/v1/health/live",
        headers={"Content-Length": oversized_length},
    )
    assert response.status_code == 413
    data = response.json()
    assert data["code"] == "PAYLOAD_TOO_LARGE"
