"""
JAGRIT AI Microservice — Centralized Configuration

Uses pydantic-settings to load from .env with fail-fast validation.
Required secrets have no usable default; the app will refuse to start
unless they are supplied via environment variables or an .env file.
"""

import os
from typing import List
import sys
from typing import Any, Dict, Literal, Optional
from pydantic import Field, ValidationError, model_validator
from typing import Any, Literal, Optional

from pydantic import ValidationError, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings:
    PROJECT_NAME: str = "JAGRIT AI Microservice"
    VERSION: str = "1.0.0"
    PORT: int = int(os.getenv("PORT", 8000))
    MOCK_INFERENCE: bool = os.getenv("MOCK_INFERENCE", "true").lower() == "true"
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:5000",
    ]
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")

settings = Settings()
class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # Runtime Environment
    ENVIRONMENT: Literal["development", "test", "production"] = "development"

    # Message Broker / Result Store
    REDIS_URL: str = "redis://localhost:6379/0"

    # Mock Switch
    MODEL_MOCK_MODE: Optional[bool] = None

    # Required Credentials (no default in non-test env)
    WHATSAPP_CLOUD_API_TOKEN: str
    WHATSAPP_PHONE_NUMBER_ID: str
    WHATSAPP_VERIFY_TOKEN: str
    SUPABASE_URL: str
    SUPABASE_SERVICE_ROLE_KEY: str

    # Phone number encryption key — Fernet-compatible base64 key.
    # Generate with: python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
    PHONE_ENCRYPTION_KEY: str = ""

    @model_validator(mode="before")
    @classmethod
    def populate_test_defaults(cls, data: Any) -> Any:
        # In test environment, provide dummy values so test suites boot cleanly without requiring live credentials
        if isinstance(data, dict):
            env_val = data.get("ENVIRONMENT", os.getenv("ENVIRONMENT", "development"))
            if env_val == "test":
                data.setdefault("WHATSAPP_CLOUD_API_TOKEN", "mock_test_whatsapp_token")
                data.setdefault("WHATSAPP_PHONE_NUMBER_ID", "mock_test_phone_id")
                data.setdefault("WHATSAPP_VERIFY_TOKEN", "mock_test_verify_token")
                data.setdefault("SUPABASE_URL", "https://mock.test.supabase.co")
                data.setdefault("SUPABASE_SERVICE_ROLE_KEY", "mock_test_service_key")
                data.setdefault(
                    "PHONE_ENCRYPTION_KEY",
                    "dGVzdC1rZXktMzItYnl0ZXMtbG9uZy4uLi4uLiE=",  # test-only placeholder (NOT a real Fernet key)
                )
        return data

    @model_validator(mode="after")
    def resolve_model_mock_mode(self) -> "Settings":
        if self.MODEL_MOCK_MODE is None:
            self.MODEL_MOCK_MODE = (self.ENVIRONMENT != "production")
        return self

    @property
    def MODEL_DEVICE(self) -> str:
        """Dynamically detect available hardware accelerator."""
        try:
            import torch
            return "cuda" if torch.cuda.is_available() else "cpu"
        except (ImportError, Exception):
            return "cpu"


try:
    settings = Settings()
except ValidationError as exc:
    missing_vars = []
    for error in exc.errors():
        loc = ".".join(str(item) for item in error.get("loc", []))
        msg = error.get("msg", "field required")
        missing_vars.append(f"  - {loc}: {msg}")

    sys.stderr.write(
        "\n" + "=" * 60 + "\n"
        "[FATAL CONFIGURATION ERROR] Missing required environment variables:\n"
        + "\n".join(missing_vars)
        + "\n\nPlease supply the missing variables via an `.env` file or export them."
        "\nRefer to `.env.example` for required definitions."
        "\n" + "=" * 60 + "\n\n"
    )
    raise


CANDIDATE_GATE_DISTANCE_M = 500.0
CANDIDATE_GATE_COSINE_SIM = 0.85
COMPOSITE_D_MERGE_THRESHOLD = 0.72

# MPS Component Weights (Formula 2, v14.1.0)
WEIGHT_HEALTH = 0.25
WEIGHT_ECON = 0.20
WEIGHT_VULN = 0.15
WEIGHT_DECAY = 0.15
WEIGHT_POP = 0.15
WEIGHT_UPVOTES = 0.10

# Dedup composite weights
WEIGHT_TEXT_SIM = 0.30
WEIGHT_GEO_KERNEL = 0.25
WEIGHT_TIME_KERNEL = 0.15
WEIGHT_MEDIA_SIM = 0.15
WEIGHT_ENTITY_SIM = 0.15

# Kernel decay parameters
GEO_KERNEL_SIGMA_M = 75.0
TIME_KERNEL_TAU_DAYS = 14.0
TIME_HARD_CUTOFF_DAYS = 45.0
EMBEDDING_DIMENSION = 1536
TRIAGE_AUTO_ROUTE_THRESHOLD = 0.85
TRIAGE_ESCALATE_THRESHOLD = 0.20
DOMAIN_TAG_THRESHOLD = 0.25

# WBS Tiered Sprint Durations (Appendix A — exact canonical totals)
TIER_1_ROUNDS = {"round_1": 7, "round_2": 14, "round_3": 7, "total": 28}
TIER_2_ROUNDS = {"round_1": 10, "round_2": 30, "round_3": 10, "total": 50}
TIER_3_ROUNDS = {"round_1": 14, "round_2": 45, "round_3": 14, "total": 73}
MAX_EXAM_BUFFER_DAYS = 14

# Scope Expansion (Change #11 / Anti-Speculation Rule 2)
SCOPE_EXPANSION_BUDGET_MULTIPLIER = 1.25
SCOPE_EXPANSION_SPARES_MONTHS = 24
SCOPE_EXPANSION_NEP_CREDITS = 6

# H-Score Anti-Speculation Penalty (Change #11)
H_SCORE_INVITE_MATCH_THRESHOLD = 0.80
H_SCORE_PENALTY_PER_IGNORED_BID = 5

assert TIER_1_ROUNDS["round_1"] + TIER_1_ROUNDS["round_2"] + TIER_1_ROUNDS["round_3"] == TIER_1_ROUNDS["total"]
assert TIER_2_ROUNDS["round_1"] + TIER_2_ROUNDS["round_2"] + TIER_2_ROUNDS["round_3"] == TIER_2_ROUNDS["total"]
assert TIER_3_ROUNDS["round_1"] + TIER_3_ROUNDS["round_2"] + TIER_3_ROUNDS["round_3"] == TIER_3_ROUNDS["total"]