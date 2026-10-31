# System Architecture

## 1. Monorepo Topology

Project Red Velvet is organized as a modular, unified monorepo powered by `pnpm` workspaces for frontend packages and isolated Python virtual environments for backend services.

```
red-velvet/
├── apps/
│   ├── web/          # Next.js 14 App Router (Public Haute Editorial Experience)
│   ├── api/          # FastAPI 0.115 (Async Telemetry & Business Engine)
│   └── admin/        # Next.js 14 App Router (Curation & Governance Console)
│
├── packages/
│   ├── ui/           # Design System Tokens, Tailored Primitives, Tailwind Preset
│   ├── types/        # Shared TypeScript Interfaces, RFC 7807 Types, Domain Contracts
│   └── shared/       # Shared Validation Foundations, Formatting, System Constants
│
├── infrastructure/
│   ├── docker/       # Multi-Stage Dockerfiles (web, api, admin)
│   ├── deployment/   # Hardened Kubernetes Manifests & Seccomp Profiles
│   ├── monitoring/   # Prometheus & OpenTelemetry Collector Configs
│   └── security/     # Trivy, Gitleaks, Reverse Proxy Security Headers
│
├── docs/             # Technical Documentation & Architecture Decision Records (ADRs)
├── tests/            # End-to-End, Integration, Security Baseline, & Load Tests
└── .github/          # GitHub Actions Workflows, Issue & PR Templates
```

---

## 2. Component Architecture

### 2.1 Frontend Presentation Tier (`apps/web` & `apps/admin`)

- **Framework**: Next.js 14 with App Router, React 18, Strict TypeScript.
- **Styling**: Tailwind CSS configured with `@red-velvet/ui/preset`.
- **Motion & 3D Layer**: Modular Three.js, React Three Fiber, GSAP, and Anime.js loaded strictly via `next/dynamic` with SSR disabled (`ssr: false`).
- **Resilience**: Hierarchical Error Boundaries (`error.tsx`), skeleton loading states (`loading.tsx`), and typed API clients (`api-client.ts`) with timeout and retry controls.

### 2.2 Backend Telemetry & Logic Tier (`apps/api`)

- **Framework**: Python 3.11+, FastAPI, Pydantic v2, SQLAlchemy 2.0 async.
- **Datastores**: PostgreSQL 16 (with connection pooling via `asyncpg`), Redis 7 (async connection pool).
- **Migrations**: Alembic with automated schema revisioning (`alembic/versions/`).
- **Observability**: Structured JSON logging with `X-Trace-ID` distributed request tracing.
- **Security Middleware**: Enforces OWASP ASVS response headers and rejects requests exceeding 10MB to prevent body flooding attacks.

---

## 3. Communication Contracts

All inter-service and client-to-server communications strictly adhere to:

- **JSON Payloads**: UTF-8 encoded with Pydantic and TypeScript validation.
- **Errors**: RFC 7807 (Problem Details for HTTP APIs) format with trace IDs.
- **Tracing**: Propagated via `X-Trace-ID` across reverse proxy, frontend clients, and backend middleware.
