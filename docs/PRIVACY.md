# Privacy & Data Governance Architecture

## 1. Principles of Privacy by Design

Project Red Velvet operates under strict data privacy principles conforming to the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).

1. **Data Minimization**: Only information strictly necessary for editorial portfolio curation and user account management is collected and stored.
2. **Explicit Consent & Purpose Limitation**: Talent portfolios and personal imagery are displayed only upon explicit authorization by the data owner.
3. **Right to Erasure (Forgetfulness)**: Hard deletion procedures will purge all tenant records, associated media files from object stores, and cached entries.
4. **Data Portability**: Tenants and talent may export their portfolio metadata and high-resolution assets in standardized machine-readable formats.

---

## 2. PII Classification & Protection

| Data Field            | Classification       | Protection Measure                                       |
| :-------------------- | :------------------- | :------------------------------------------------------- |
| **Email Address**     | PII                  | AES-256 encryption at rest, hashed indexes for lookups   |
| **Full Name**         | PII                  | Restricted access via tenant permissions                 |
| **IP Addresses**      | Technical PII        | Anonymized / hashed in audit logs after 90-day retention |
| **Portraits & Media** | Biometric / Personal | Encrypted at rest (SSE-KMS), presigned ephemeral access  |

---

## 3. Data Retention & Archival

- **Active Portfolios**: Retained during subscription duration.
- **Security Logs**: Retained for 365 days in cold storage for compliance auditing, then purged automatically.
- **Deleted Tenants**: Soft-deleted with a 30-day recovery grace period, followed by permanent cryptographic shredding.
