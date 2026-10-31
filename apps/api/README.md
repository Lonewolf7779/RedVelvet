# @red-velvet/api

Project Red Velvet Backend API & Telemetry Engine.

## Architectural Foundation

- **Framework**: Python 3.11+, FastAPI, Pydantic v2, SQLAlchemy 2.0 (asyncpg), Alembic, Redis.
- **Security**: OWASP ASVS v4.0.3 Level 2 baseline, RFC 7807 structured error envelopes, strict CORS origin controls, security response headers, and request body size limitation middleware.
- **Telemetry**: Structured JSON logging with trace correlation IDs, `/api/v1/health/live`, `/api/v1/health/ready`, and `/api/v1/health/status`.
- **Boundaries**: Explicit boundary contracts for Authentication (RV-002) and Profiles/Portfolios (RV-003).
