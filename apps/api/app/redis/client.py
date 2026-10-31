import time
from typing import Any

import redis.asyncio as aioredis

from app.core.config import settings
from app.core.logging import logger

redis_client: aioredis.Redis | None = None


def get_redis_client() -> aioredis.Redis:
    global redis_client
    if redis_client is None:
        redis_client = aioredis.from_url(
            str(settings.REDIS_URL),
            max_connections=settings.REDIS_POOL_MAX_CONNECTIONS,
            decode_responses=True,
        )
    return redis_client


async def check_redis_health() -> dict[str, Any]:
    """Perform health verification probe against Redis cluster/instance."""
    start_time = time.perf_counter()
    try:
        client = get_redis_client()
        pong = await client.ping()
        if pong:
            latency_ms = round((time.perf_counter() - start_time) * 1000, 2)
            return {"status": "connected", "latency_ms": latency_ms}
        return {"status": "disconnected"}
    except Exception as exc:
        logger.warning(f"Redis health probe failed: {exc}")
        return {"status": "disconnected", "error": str(exc)}


async def close_redis() -> None:
    """Safe shutdown procedure for Redis connection pool."""
    global redis_client
    if redis_client is not None:
        logger.info("Closing Redis connection pool...")
        await redis_client.aclose()
        redis_client = None
