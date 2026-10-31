from fastapi import APIRouter

from app.schemas.boundaries import AuthBoundaryContract

router = APIRouter(prefix="/auth", tags=["Authentication Boundary (RV-002 Planning)"])


@router.get(
    "/boundary",
    response_model=AuthBoundaryContract,
    summary="Authentication Domain Architectural Contract",
    description="Explicitly exposes the planned architectural specification for authentication without implementing mock or premature credentials.",
)
async def get_auth_boundary_contract() -> AuthBoundaryContract:
    return AuthBoundaryContract()
