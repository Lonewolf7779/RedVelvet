# Database Architecture & Migration Infrastructure

## 1. Relational Engine & Driver

- **Engine**: PostgreSQL 16
- **Driver**: `asyncpg` via SQLAlchemy 2.0 async engine
- **Primary Key Standard**: RFC 4122 Version 4 UUIDs (cryptographically non-sequential, preventing enumeration attacks).
- **Timestamps**: All tables include UTC timezone-aware timestamps (`created_at`, `updated_at`).

---

## 2. Connection Pooling Configuration

- `pool_size`: 10 persistent connections per application worker.
- `max_overflow`: 20 connections for peak traffic spikes.
- `pool_timeout`: 30 seconds before raising timeout exceptions.
- `pool_pre_ping`: True (validates connection health before issuing queries to prevent stale connection errors).

---

## 3. Migration Infrastructure (Alembic)

- **Configuration**: `apps/api/alembic.ini`
- **Environment**: `apps/api/alembic/env.py` configured with async database execution (`run_async_migrations`).
- **Initial Migration**: `apps/api/alembic/versions/0001_initial_schema.py` establishes the foundational `security_audit_logs` table.
- **Execution Rules**:
  - All migrations must provide both `upgrade()` and `downgrade()` procedures.
  - Schema modifications must be backward-compatible to enable zero-downtime rolling updates.
  - Direct table alteration via SQL consoles in production is strictly prohibited.

---

## 4. Multi-Tenant Partitioning Model

All tenant-scoped tables will enforce foreign keys to the `organizations` table:

```sql
ALTER TABLE entities ADD CONSTRAINT fk_tenant FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE;
CREATE INDEX idx_entities_tenant ON entities(organization_id);
```

Row-Level Security (RLS) policies will enforce tenant context at the database engine level.
