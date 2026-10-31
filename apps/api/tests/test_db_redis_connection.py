import pytest

from app.db.session import check_db_health, engine
from app.redis.client import check_redis_health


def test_db_engine_configuration():
    """Verify SQLAlchemy async engine configuration parameters."""
    assert engine.url.drivername == "postgresql+asyncpg"
    assert engine.pool is not None


@pytest.mark.asyncio
async def test_db_health_fallback_handling():
    """Verify database health probe handles offline state gracefully without crash."""
    health = await check_db_health()
    assert "status" in health
    assert health["status"] in ["connected", "disconnected"]


@pytest.mark.asyncio
async def test_redis_health_fallback_handling():
    """Verify Redis health probe handles offline state gracefully without crash."""
    health = await check_redis_health()
    assert "status" in health
    assert health["status"] in ["connected", "disconnected"]
