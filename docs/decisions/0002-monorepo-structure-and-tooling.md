# ADR 0002: Monorepo Structure and Tooling

## Status

Accepted

## Context

Project Red Velvet encompasses an editorial web application, an administrative portal, a Python telemetry/business API, and shared design tokens and domain models. Managing disparate repositories would create version drift and deployment complexity.

## Decision

We establish a modular monorepo structure separating applications (`apps/`), shared domain libraries (`packages/`), infrastructure declarations (`infrastructure/`), and global test suites (`tests/`). Frontend workspaces are orchestrated via `pnpm`, while backend services maintain decoupled Python dependency configurations.

## Consequences

- **Positive**: Shared TypeScript contracts, atomic commits spanning frontend and backend, consolidated CI/CD.
- **Negative**: Requires strict boundaries to prevent leaky cross-domain package dependencies.
