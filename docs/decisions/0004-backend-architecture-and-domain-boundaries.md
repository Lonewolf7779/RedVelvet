# ADR 0004: Backend Architecture and Domain Boundaries

## Status

Accepted

## Context

Milestone RV-001 establishes engineering foundations without prematurely introducing full authentication mechanisms or profile databases before the architecture is hardened.

## Decision

We implement Python FastAPI with Pydantic v2 and SQLAlchemy 2.0 async. For authentication and profiles, we establish explicit domain boundary contracts (`/api/v1/auth/boundary` and `/api/v1/profiles/boundary`) that formalize the interfaces and requirements for subsequent milestones (RV-002 and RV-003) without generating fake credentials or mock bypasses.

## Consequences

- **Positive**: Clean separation of concerns, no premature tech debt, strictly verifiable boundary contracts.
- **Negative**: Authentication endpoints return architectural specifications until RV-002 implementation.
