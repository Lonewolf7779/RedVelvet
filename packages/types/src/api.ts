/**
 * Standard API error and response types conforming to Red Velvet architectural specifications.
 */

export interface ApiErrorDetail {
  field?: string;
  issue: string;
  code?: string;
}

export interface ApiErrorResponse {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  code: string;
  trace_id: string;
  timestamp: string;
  errors?: ApiErrorDetail[];
}

export interface ApiResponseEnvelope<T> {
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    timestamp: string;
    trace_id: string;
  };
}

export interface HealthStatusResponse {
  status: "ok" | "degraded" | "unhealthy";
  version: string;
  environment: string;
  timestamp: string;
  dependencies: {
    database: {
      status: "connected" | "disconnected" | "not_configured";
      latency_ms?: number;
    };
    redis: {
      status: "connected" | "disconnected" | "not_configured";
      latency_ms?: number;
    };
  };
}
