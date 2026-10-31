# ADR 0007: Database Migration and Connection Resilience

## Status

Accepted

## Context

Production databases require structured schema migrations, connection pooling to withstand traffic spikes, and real-time connectivity probes for zero-downtime rolling orchestrations.

## Decision

We select SQLAlchemy 2.0 with the async `asyncpg` driver for PostgreSQL 16, coupled with Alembic for migration management. We configure connection pooling with `pool_pre_ping=True` and implement active health check probes (`/api/v1/health/ready`) to integrate with container orchestration systems.

## Consequences

- **Positive**: High throughput async I/O, resilient against transient network drops, fully version-controlled migrations.
- **Negative**: Requires async transaction discipline across all database operations.
