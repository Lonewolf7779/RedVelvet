from pydantic import BaseModel


class AuthBoundaryContract(BaseModel):
    """
    Architectural boundary specification for Authentication (Scheduled for RV-002).
    """

    boundary_name: str = "Authentication & Identity Management"
    status: str = "SPECIFICATION_ONLY"
    planned_mechanism: str = (
        "OIDC / OAuth 2.0 with JWT access tokens and secure HttpOnly cookie session refresh"
    )
    owasp_reference: str = (
        "OWASP ASVS v4.0.3 Section 2 (Authentication) & Section 3 (Session Management)"
    )
    supported_flows: list[str] = [
        "Authorization Code with PKCE",
        "Multi-Factor Authentication (MFA / TOTP)",
        "Ephemeral Delegation Tokens",
    ]


class ProfilesBoundaryContract(BaseModel):
    """
    Architectural boundary specification for Editorial Profiles & Talent (Scheduled for RV-003).
    """

    boundary_name: str = "Editorial Profiles & Multi-tenant Talent Curation"
    status: str = "SPECIFICATION_ONLY"
    planned_isolation: str = "Organization-scoped tenant partitioning with ABAC permissions"
    owasp_reference: str = "OWASP ASVS v4.0.3 Section 4 (Access Control)"
    entity_domains: list[str] = [
        "Talent Portfolios",
        "Atelier Organizations",
        "Curator Workspaces",
    ]
