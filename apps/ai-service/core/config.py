"""
JAGRIT AI Microservice — Application Configuration

Uses Pydantic BaseSettings to load environment variables with sane
hackathon-friendly defaults. The critical resilience flag is
`MOCK_INFERENCE`: when true (default), all AI endpoints must return
deterministic, realistic Jharkhand mock payloads instead of invoking
heavy PyTorch/transformers model downloads that may fail or be slow
on unreliable hackathon Wi-Fi.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # --- Server ---
    PORT: int = 8000

    # --- Resilience Switch ---
    # When True, endpoints must short-circuit to deterministic mock
    # payloads instead of loading/running real ML models.
    MOCK_INFERENCE: bool = True

    # --- External Services ---
    OPENAI_API_KEY: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )


# Singleton settings instance shared across the app
settings = Settings()
