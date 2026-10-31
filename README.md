# PROJECT RED VELVET

> **Haute Architecture, High-Fashion Editorial Curation & Multi-Tenant Portfolio Platform**

[![Frontend Validation](https://github.com/Lonewolf7779/RedVelvet/actions/workflows/frontend.yml/badge.svg)](https://github.com/Lonewolf7779/RedVelvet/actions/workflows/frontend.yml)
[![Backend Validation](https://github.com/Lonewolf7779/RedVelvet/actions/workflows/backend.yml/badge.svg)](https://github.com/Lonewolf7779/RedVelvet/actions/workflows/backend.yml)
[![Security Scanning](https://github.com/Lonewolf7779/RedVelvet/actions/workflows/security.yml/badge.svg)](https://github.com/Lonewolf7779/RedVelvet/actions/workflows/security.yml)
[![Docker Validation](https://github.com/Lonewolf7779/RedVelvet/actions/workflows/docker.yml/badge.svg)](https://github.com/Lonewolf7779/RedVelvet/actions/workflows/docker.yml)

---

## 1. Overview

**Project Red Velvet** is a security-hardened, high-fashion editorial platform and private portfolio ecosystem. Designed for luxury fashion houses, haute horlogerie curators, and talent agencies, it bridges high-fashion magazine aesthetics with enterprise-grade multi-tenancy and an unyielding defense-in-depth posture conforming to **OWASP ASVS v4.0.3 Level 2**.

---

## 2. Visual Identity & Editorial Direction

- **Strict Color Harmony**: Deep burgundy (`#4A0E17`), wine red (`#721B29`), pure white (`#FFFFFF`), charcoal (`#1C1C1E`), and concrete grey (`#D1D1D6`).
- **Editorial Typography**: Elegant high-contrast serif headlines (`Cormorant Garamond`), crisp architectural sans body (`Inter`), and monospace telemetry readouts (`JetBrains Mono`).
- **Composition**: Generous margins, fine architectural dividers, restrained black-and-white photography, and disciplined grid spacing.
- **Prohibitions**: Strictly free from generic SaaS templates, cartoonish illustrations, purple gradients, and generic rounded cards.

---

## 3. Monorepo Structure

```
red-velvet/
│
├── apps/
│   ├── web/                     # Next.js 14 App Router (Editorial Public Experience)
│   ├── api/                     # Python FastAPI & SQLAlchemy (Telemetry & Business Engine)
│   └── admin/                   # Next.js 14 App Router (Curation & Governance Console)
│
├── packages/
│   ├── ui/                      # Editorial Design System, Tokens, Tailwind Preset
│   ├── types/                   # Shared TypeScript Interfaces, RFC 7807 Models, Contracts
│   └── shared/                  # Utilities, Security Input Sanitization, Constants
│
├── infrastructure/
│   ├── docker/                  # Hardened Multi-Stage Dockerfiles (web, api, admin)
│   ├── deployment/              # Kubernetes Manifests & Security Profiles
│   ├── monitoring/              # Prometheus Scrape & OpenTelemetry Configs
│   └── security/                # Trivy, Gitleaks, Reverse Proxy Security Headers
│
├── docs/                        # Specifications, PRD, & Architecture Decision Records (ADRs)
│   ├── PRD.md                   # Product Requirements Document
│   ├── ARCHITECTURE.md          # Monorepo Topology & Inter-Service Communication
│   ├── SECURITY.md              # Threat Model & OWASP ASVS Architecture
│   ├── PRIVACY.md               # Data Protection & GDPR Governance
│   ├── PERMISSIONS.md           # Hybrid RBAC / ABAC Permissions
│   ├── DATABASE.md              # Schema Guidelines & Connection Pooling
│   ├── API.md                   # Versioned REST APIs & RFC 7807 Error Envelopes
│   ├── TESTING.md               # Quality Assurance & Testing Pyramid
│   ├── DEPLOYMENT.md            # Zero-Downtime Deployment & Environment Strategy
│   ├── DEVELOPMENT.md           # Local Setup & Contribution Guidelines
│   └── decisions/               # Architecture Decision Records (ADRs 0001 - 0007)
│
├── tests/                       # Global Verification Suites (e2e, integration, security, load)
├── .github/                     # Pinned GitHub Actions Workflows & Templates
├── docker-compose.yml           # Local Orchestration (PostgreSQL, Redis, API, Web)
├── .editorconfig                # Universal Formatting Rules
├── .gitignore                   # Strict Secret & Artifact Exclusions
├── .dockerignore                # Container Context Sanitization
└── LICENSE                      # MIT License
```

---

## 4. Technology Stack

| Layer                   | Technologies                                                          |
| :---------------------- | :-------------------------------------------------------------------- |
| **Frontend**            | Next.js 14 (App Router), React 18, TypeScript (Strict), Tailwind CSS  |
| **Motion / 3D**         | Modular Three.js, React Three Fiber, GSAP, Anime.js (Dynamic imports) |
| **Backend**             | Python 3.11+, FastAPI 0.115, Pydantic v2, SQLAlchemy 2.0 (asyncpg)    |
| **Datastores**          | PostgreSQL 16, Redis 7 (Async connection pools)                       |
| **Database Migrations** | Alembic (Async runner configuration)                                  |
| **Security Standards**  | OWASP ASVS v4.0.3 Level 2, RFC 7807 Problem Details                   |
| **Containerization**    | Docker, Docker Compose, Kubernetes with non-root security contexts    |
| **CI/CD**               | GitHub Actions (Pinned immutable SHAs)                                |

---

## 5. Getting Started

### 5.1 Prerequisites

- Node.js v20.x or higher
- pnpm v12.x or higher
- Python v3.11 or higher
- Docker & Docker Compose (Optional for local services)

### 5.2 Quick Local Start

```bash
# 1. Clone repository and switch to feature branch
git clone https://github.com/Lonewolf7779/RedVelvet.git
cd RedVelvet
git checkout feature/rv-001-foundation

# 2. Start containerized datastores (optional)
docker compose up -d postgres redis

# 3. Setup and run frontend
pnpm install
pnpm --filter @red-velvet/web dev

# 4. Setup and run backend
cd apps/api
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt -r requirements-dev.txt
uvicorn app.main:app --reload --port 8000
```

---

## 6. Verification & Testing

### 6.1 Backend Verification

```bash
pytest apps/api/tests tests/security --cov=apps/api/app --cov-report=term-missing
ruff check apps/api
mypy apps/api/app
```

### 6.2 Frontend Verification

```bash
pnpm run format:check
pnpm run typecheck
pnpm run lint
pnpm run test
pnpm run build
```

---

## 7. Security Foundation & Threat Model

- **Secret Isolation**: Hardcoded secrets, production passwords, and tokens are strictly barred. Enforced via `.gitignore`, `.env.example`, and automated Gitleaks CI scanning.
- **HTTP Hardening**: Automatic injection of `HSTS`, `CSP`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Permissions-Policy`.
- **Payload Size Protection**: Request size limiting middleware strictly rejects incoming HTTP requests exceeding 10MB to mitigate denial-of-service attempts.
- **Private Media Protection**: Zero public cloud storage buckets. Private assets are accessed exclusively via short-lived presigned URLs.

For in-depth security architecture, consult [docs/SECURITY.md](docs/SECURITY.md).

---

## 8. Milestone Roadmap

- [x] **RV-001: Foundation Architecture & Engineering Infrastructure** (Complete)
- [ ] **RV-002: Authentication & Session Management (OIDC / OAuth 2.0 / PKCE)**
- [ ] **RV-003: Multi-Tenant Editorial Profiles & Talent Directory**
- [ ] **RV-004: Private Portfolio Storage & Ephemeral Media Delivery Engine**
- [ ] **RV-005: Haute Curation Workspaces & Editorial Showcase Builder**

---

## 9. License

Distributed under the MIT License. See [LICENSE](LICENSE) for more details.
