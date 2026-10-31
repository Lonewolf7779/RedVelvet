# Container Infrastructure

Multi-stage, security-hardened Docker containers for Project Red Velvet applications.

## Hardening Standards

- Non-root user execution (`UID 10001` / `UID 1001`).
- Minimal base images (Alpine and Debian-slim).
- Multi-stage caching preventing source compilers and development tools in runtime images.
- Built-in container healthchecks.
- No hardcoded credentials or build arguments containing secrets.
