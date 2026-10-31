from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    ENVIRONMENT: str = "local"
    PROJECT_NAME: str = "Project Red Velvet API"
    API_V1_STR: str = "/api/v1"

    # Database Configuration
    DATABASE_URL: str = "postgresql+asyncpg://redvelvet_user:redvelvet_dev_insecure_change_me@localhost:5432/redvelvet"
    DB_POOL_SIZE: int = 10
    DB_MAX_OVERFLOW: int = 20
    DB_POOL_TIMEOUT: int = 30

    # Redis Configuration
    REDIS_URL: str = "redis://:redvelvet_redis_dev_change_me@localhost:6379/0"
    REDIS_POOL_MAX_CONNECTIONS: int = 20

    # Security & CORS Settings
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
    ]
    MAX_REQUEST_SIZE_BYTES: int = 10 * 1024 * 1024  # 10MB
    LOG_LEVEL: str = "INFO"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: str | list[str]) -> list[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, list):
            return v
        import json

        return json.loads(v)

    @field_validator("ENVIRONMENT")
    @classmethod
    def validate_environment(cls, v: str) -> str:
        valid_envs = ["local", "development", "staging", "production", "test"]
        v_lower = v.lower()
        if v_lower not in valid_envs:
            raise ValueError(f"Invalid environment '{v}'. Must be one of: {valid_envs}")
        return v_lower

    @field_validator("CORS_ORIGINS")
    @classmethod
    def validate_production_cors(cls, v: list[str], info) -> list[str]:
        env = info.data.get("ENVIRONMENT", "local")
        if env == "production" and "*" in v:
            raise ValueError("Wildcard '*' CORS origins are strictly prohibited in production")
        return v


settings = Settings()
