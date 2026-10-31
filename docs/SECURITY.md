# Security Architecture & Threat Model

**Reference Standard**: OWASP Application Security Verification Standard (ASVS) v4.0.3 Level 2  
**Classification**: CONFIDENTIAL // ARCHITECTURAL BASELINE

---

## 1. Threat Model & Asset Identification

### 1.1 Critical Assets

1. **Private Portfolio Media**: High-resolution, unpublished casting imagery and embargoed lookbooks.
2. **Tenant Data & Organization Isolation**: Agency client lists, talent contacts, and contract terms.
3. **Authentication & Session Tokens**: High-privilege curator and superadmin credentials.
4. **Security Audit Trails**: Tamper-resistant historical logs of system operations.

### 1.2 Threat Actors & Attack Vectors

| Threat Actor                | Motivation                     | Attack Vector                                                   | Mitigation in Red Velvet                                                                 |
| :-------------------------- | :----------------------------- | :-------------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| **External Attacker**       | Data theft, asset exfiltration | Direct object reference (BOLA/IDOR), SQL injection, brute force | Cryptographic UUIDs, SQLAlchemy parameterized queries, rate limits, no public S3 buckets |
| **Malicious Tenant**        | Espionage into rival agency    | Multi-tenant escape, tenant ID parameter tampering              | Enforced tenant context in SQL queries, DB row-level security (RLS)                      |
| **Compromised Insider**     | Unauthorized distribution      | Session hijacking, permission escalation                        | Ephemeral presigned URLs, immediate token revocation, detailed audit logs                |
| **Denial of Service (DoS)** | Disruption of service          | Large payload body flooding, slowloris                          | Request size limiter middleware (10MB limit), connection pooling                         |

---

## 2. Planned Security Implementations (Architectural Approach)

> [!IMPORTANT]
> The following capabilities represent planned architectural blueprints for subsequent milestones (RV-002 through RV-005). They are formally documented and specified here; they are not yet implemented in code.

### 2.1 Authentication (Planned: RV-002)

- **Architecture**: OpenID Connect (OIDC) / OAuth 2.0 with Authorization Code Flow + PKCE.
- **Storage**: Cryptographically bound refresh tokens stored in `HttpOnly`, `Secure`, `SameSite=Strict` cookies.
- **MFA**: Compulsory TOTP/WebAuthn multi-factor authentication for administrative and curator roles.
- **Passwords**: Argon2id hashing with minimum parameter recommendations (m=65536, t=3, p=4).

### 2.2 Authorisation & RBAC/ABAC (Planned: RV-002 / RV-003)

- **Model**: Attribute-Based Access Control (ABAC) combined with Role-Based Access Control (RBAC).
- **Evaluation**: Authorization checks will execute on the service layer, evaluating:
  `Subject (User, Role)` + `Action (Read, Write, Embargo)` + `Resource (Portfolio, Media)` + `Environment (TenantID, Time)`.
- **Zero Trust**: No implicit rights; explicit permissions required for every resource operation.

### 2.3 Organisation Isolation (Multi-Tenancy) (Planned: RV-003)

- **Strategy**: Logical tenant isolation via compulsory `organization_id` foreign keys, bolstered by PostgreSQL Row-Level Security (RLS) policies.
- **Boundary Validation**: API middleware extracts and validates tenant membership from the authenticated principal context. Cross-tenant queries are rejected unconditionally at the database layer.

### 2.4 Private Portfolio Storage & Media Access (Planned: RV-004)

- **No Public Buckets**: Private portfolio storage buckets are provisioned with all public access strictly blocked (`BlockPublicAcls`, `BlockPublicPolicy`, `IgnorePublicAcls`, `RestrictPublicBuckets`).
- **Access Delegation**: Client access to imagery is granted exclusively through short-lived presigned URLs (maximum 15-minute expiration) generated on-demand following strict ABAC evaluation.
- **Content Protection**: High-resolution originals remain watermarked or degraded unless the requester holds verified curator/client credentials.

### 2.5 Session Management & Revocation (Planned: RV-002)

- **Lifespan**: Short-lived access tokens (15-minute validity); refresh tokens valid up to 7 days with sliding window expiration.
- **Revocation Engine**: Redis-backed distributed token denylist and revocation set. Session revocation triggers immediate invalidation across all distributed nodes.

### 2.6 Audit Logging (Planned: RV-001 Baseline / RV-002 Execution)

- **Model**: Conforming to OWASP ASVS V7. Foundation schema established in `app/models/audit.py` and Alembic migration `0001_initial_schema.py`.
- **Captured Attributes**: `event_type`, `actor_id`, `organization_id`, `ip_address`, `user_agent`, `action`, `resource`, `outcome`, `severity`, and `created_at`.
- **Integrity**: Append-only log tables with write-once protections in production.

---

## 3. Implemented Security Controls (Milestone RV-001)

- [x] **Strict HTTP Security Headers**: HSTS, CSP, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy.
- [x] **Request Size Limiting**: Middleware rejects incoming payloads larger than 10MB (HTTP 413).
- [x] **Secure CORS**: Wildcard `*` prohibited in production; strict origin whitelist enforced.
- [x] **Secret Isolation**: Zero secrets in Git repository; comprehensive `.gitignore`, `.env.example`, and Gitleaks scanning workflow.
- [x] **Container Hardening**: Docker images execute as unprivileged users (`UID 10001` / `UID 1001`) with multi-stage builds.
- [x] **Static Security Analysis**: Automated scanning in CI via Bandit, Trivy, and Gitleaks.
