"""
Shared test fixtures for the Jagrit AI Service test suite.

Sets ENVIRONMENT=test and MODEL_MOCK_MODE=true before any application
imports, ensuring the Settings model_validator populates test defaults
for all required secrets.
"""

import os

# Must be set BEFORE any application code imports core.config
os.environ["ENVIRONMENT"] = "test"
os.environ["MODEL_MOCK_MODE"] = "true"

# Test-only encryption key — a passphrase that will be SHA-256-derived into
# a valid Fernet key by core.security._get_fernet().  This value exists
# ONLY in test code, never in application source.
TEST_PHONE_ENCRYPTION_KEY = "jagrit-test-encryption-key-2026"
os.environ["PHONE_ENCRYPTION_KEY"] = TEST_PHONE_ENCRYPTION_KEY

import pytest
from fastapi.testclient import TestClient

from main import app


@pytest.fixture()
def client():
    """FastAPI TestClient fixture."""
    return TestClient(app)


@pytest.fixture(autouse=True)
def _reset_fernet():
    """Reset the Fernet cipher cache between tests so key changes take effect."""
    from core.security import reset_fernet
    reset_fernet()
    yield
    reset_fernet()

