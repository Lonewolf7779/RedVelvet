# API Architecture & Specifications

## 1. Versioning Strategy

- **URI Versioning**: All API routes are prefixed with `/api/v1`.
- **Breaking Changes**: New major API revisions will be hosted under `/api/v2` with deprecation grace periods.

---

## 2. Error Envelopes (RFC 7807)

All API failure responses return standardized `application/problem+json` envelopes:

```json
{
  "type": "https://redvelvet.luxury/errors/validation-failed",
  "title": "Validation Error",
  "status": 422,
  "detail": "The incoming request payload failed schema validation",
  "instance": "/api/v1/editorial",
  "code": "VALIDATION_FAILED",
  "trace_id": "8f8b6f72-9a3c-4d3b-9e41-628d087b3e10",
  "timestamp": "2026-10-31T04:20:00Z",
  "errors": [
    {
      "field": "body -> title",
      "issue": "Field required"
    }
  ]
}
```

---

## 3. Standard Endpoints (Foundation Milestone)

| Method | Path                        | Purpose                                               |
| :----- | :-------------------------- | :---------------------------------------------------- |
| `GET`  | `/api/v1/health/live`       | Kubernetes Liveness Probe                             |
| `GET`  | `/api/v1/health/ready`      | Kubernetes Readiness Probe (PostgreSQL & Redis check) |
| `GET`  | `/api/v1/health/status`     | Detailed Subsystem Telemetry & Latencies              |
| `GET`  | `/api/v1/auth/boundary`     | Authentication Domain Contract (RV-002 Planning)      |
| `GET`  | `/api/v1/profiles/boundary` | Profiles Domain Contract (RV-003 Planning)            |

---

## 4. Security Controls & Header Enforcement

Every response is automatically stamped with OWASP ASVS-compliant headers:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Trace-ID: <uuid>`
