# Deployment Architecture & Production Readiness

## 1. Environment Separation

Project Red Velvet maintains strict, air-gapped environment isolation:

- **Local / Development**: Ephemeral SQLite/Postgres and Redis running in Docker Compose (`ENVIRONMENT=local`).
- **Staging**: Complete replica of production environment with anonymized datasets (`ENVIRONMENT=staging`).
- **Production**: Hardened Kubernetes cluster with managed cloud databases and object stores (`ENVIRONMENT=production`).

---

## 2. Container Hardening Standards

- **Base Images**: `node:20-alpine` and `python:3.11-slim`.
- **Execution Privileges**: All processes execute under non-root users (`UID 10001` for API, `UID 1001` for Web).
- **Filesystem Security**: Read-only root filesystem in Kubernetes deployments with ephemeral `/tmp` volume mounts.
- **Capabilities**: Linux kernel capabilities explicitly dropped (`ALL`).

---

## 3. Zero-Downtime Deployment

Deployments utilize Kubernetes RollingUpdates with health checks:

- `livenessProbe`: `/api/v1/health/live` guarantees failed processes are immediately restarted.
- `readinessProbe`: `/api/v1/health/ready` ensures traffic is routed to pods only after database and cache connections are established.
