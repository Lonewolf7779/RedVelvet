from fastapi import APIRouter

from app.api.v1.endpoints import auth_boundary, health, profiles_boundary

api_v1_router = APIRouter()
api_v1_router.include_router(health.router)
api_v1_router.include_router(auth_boundary.router)
api_v1_router.include_router(profiles_boundary.router)
