/**
 * Security Audit Logging Domain Types conforming to OWASP ASVS Section 7 (Error Handling and Logging).
 */

export type AuditEventSeverity = "info" | "warning" | "critical";

export interface SecurityAuditEvent {
  eventId: string;
  timestamp: string;
  actorId?: string;
  organizationId?: string;
  ipAddress: string;
  userAgent: string;
  action: string;
  resource: string;
  outcome: "success" | "denied" | "error";
  severity: AuditEventSeverity;
  metadata?: Record<string, unknown>;
}
