from fastapi import APIRouter

from app.api.v1.router import api_v1_router

root_api_router = APIRouter()
root_api_router.include_router(api_v1_router, prefix="/api/v1")
