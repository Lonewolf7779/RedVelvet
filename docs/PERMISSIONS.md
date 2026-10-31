# Permissions & Access Control Architecture

## 1. Hybrid RBAC & ABAC Model

Project Red Velvet enforces a hybrid access control model combining Role-Based Access Control (RBAC) for broad functional personas with Attribute-Based Access Control (ABAC) for fine-grained asset ownership and embargo rules.

---

## 2. Standard Roles

- `superadmin`: Platform operations, cross-organization maintenance, global telemetry monitoring.
- `org_admin`: Agency or atelier administrative owner; manages tenant users, billing, and organizational settings.
- `curator`: Editorial directors and curators; organizes showcases, publishes collections, and grants talent portfolio access.
- `talent`: Models, photographers, and artisans; manages their own media submissions and portfolio assets.
- `viewer`: Authorized press, buyers, or invited clients; read-only access to granted collections.

---

## 3. Attribute-Based Policy Rules (ABAC)

Fine-grained authorization evaluates the following context tuples:

$$ \text{Decision} = f(\text{Subject}, \text{Action}, \text{Resource}, \text{Environment}) $$

- **Tenant Boundary**:
  `Subject.organization_id == Resource.organization_id`
- **Embargo Check**:
  `Resource.embargo_until == null || CurrentTime >= Resource.embargo_until || Subject.role in ['org_admin', 'curator']`
- **Asset Privacy Level**:
  - `private`: Accessible only to `Resource.owner_id`.
  - `organization_restricted`: Accessible to authenticated users within the same tenant.
  - `curated_public`: Accessible to verified viewers.

---

## 4. Permission Revocation Strategy

1. **Immediate Session Invalidation**: Revoking a role writes the user ID to the Redis revocation bloom filter / blacklist.
2. **Presigned URL Expiry**: URLs issued prior to revocation expire within a maximum window of 15 minutes.
3. **Cache Busting**: Permission metadata cached in Redis is evicted immediately upon role update.
