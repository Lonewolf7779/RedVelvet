# ADR 0005: OWASP ASVS Security Foundation

## Status

Accepted

## Context

High-fashion portfolio houses and agencies handle confidential casting sessions, embargoed collections, and high-value creative assets. A generic, unverified security model leaves vulnerabilities exposed.

## Decision

We adopt the **OWASP Application Security Verification Standard (ASVS) v4.0.3 Level 2** as the foundational engineering baseline. This mandates strict HTTP security headers (HSTS, CSP, X-Frame-Options: DENY, X-Content-Type-Options: nosniff), request body size limiting (10MB maximum), strict CORS whitelists, secret isolation, and container least-privilege standards.

## Consequences

- **Positive**: Defense-in-depth posture, resistance to common injection and cross-site attacks, compliance-ready telemetry.
- **Negative**: Requires strict discipline regarding headers, payload sizes, and test verifications.
