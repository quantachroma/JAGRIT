import os
from typing import List

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