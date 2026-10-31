"""
Automated security baseline validation verifying OWASP ASVS Section 14 (Config & Headers).
"""
import pytest
from httpx import ASGITransport, AsyncClient
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../apps/api")))
from app.main import app  # noqa: E402


@pytest.mark.asyncio
async def test_owasp_security_headers_enforced():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://testserver"
    ) as client:
        response = await client.get("/api/v1/health/live")
        headers = response.headers

        # ASVS V14.4.1 - Anti-framing
        assert headers.get("X-Frame-Options") == "DENY"
        # ASVS V14.4.2 - Content sniffing protection
        assert headers.get("X-Content-Type-Options") == "nosniff"
        # ASVS V14.4.3 - Referrer-Policy
        assert headers.get("Referrer-Policy") == "strict-origin-when-cross-origin"
        # ASVS V14.4.4 - HSTS
        assert "Strict-Transport-Security" in headers
        # ASVS V14.4.5 - CSP
        assert "Content-Security-Policy" in headers


@pytest.mark.asyncio
async def test_no_server_version_disclosure():
    async with AsyncClient(
        transport=ASGITransport(app=app), base_url="http://testserver"
    ) as client:
        response = await client.get("/api/v1/health/live")
        # Ensure 'Server' header does not disclose software versions
        server_header = response.headers.get("Server", "")
        assert "uvicorn" not in server_header.lower()
