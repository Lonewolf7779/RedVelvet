from fastapi import APIRouter

from app.schemas.boundaries import ProfilesBoundaryContract

router = APIRouter(prefix="/profiles", tags=["Profiles Boundary (RV-003 Planning)"])


@router.get(
    "/boundary",
    response_model=ProfilesBoundaryContract,
    summary="Profiles Domain Architectural Contract",
    description="Exposes the multi-tenant profile and portfolio domain boundaries without premature database writes.",
)
async def get_profiles_boundary_contract() -> ProfilesBoundaryContract:
    return ProfilesBoundaryContract()
