from pydantic import BaseModel, Field


class ErrorDetail(BaseModel):
    field: str | None = Field(None, description="Request parameter or body field path")
    issue: str = Field(..., description="Description of the validation or business rule violation")


class ApiErrorSchema(BaseModel):
    type: str = Field(..., description="URI reference identifying the problem type")
    title: str = Field(..., description="Short, human-readable summary of the problem type")
    status: int = Field(..., description="HTTP status code")
    detail: str = Field(..., description="Human-readable explanation specific to this occurrence")
    instance: str = Field(..., description="URI reference identifying the specific occurrence")
    code: str = Field(..., description="Machine-readable application error code")
    trace_id: str = Field(
        ..., description="Distributed tracing identifier for telemetry correlation"
    )
    timestamp: str = Field(..., description="ISO 8601 UTC timestamp")
    errors: list[ErrorDetail] | None = Field(None, description="Detailed list of validation issues")
