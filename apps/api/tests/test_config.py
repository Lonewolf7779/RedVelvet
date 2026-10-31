import pytest
from pydantic import ValidationError

from app.core.config import Settings


def test_valid_settings_default():
    """Verify default settings instantiation."""
    s = Settings()
    assert s.ENVIRONMENT in ["local", "development", "staging", "production", "test"]
    assert s.API_V1_STR == "/api/v1"
    assert len(s.CORS_ORIGINS) > 0


def test_invalid_environment_rejected():
    """Verify unknown environments trigger validation error."""
    with pytest.raises(ValidationError):
        Settings(ENVIRONMENT="invalid_env_name")


def test_production_cors_wildcard_prohibited():
    """Verify wildcard CORS is forbidden in production environment."""
    with pytest.raises(ValidationError):
        Settings(ENVIRONMENT="production", CORS_ORIGINS=["*"])


def test_production_cors_specific_origins_allowed():
    """Verify explicit origins are allowed in production."""
    s = Settings(ENVIRONMENT="production", CORS_ORIGINS=["https://redvelvet.luxury"])
    assert "https://redvelvet.luxury" in s.CORS_ORIGINS
