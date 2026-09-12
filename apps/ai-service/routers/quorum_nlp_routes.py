"""
Quorum NLP Routes
Handles Stage 3 vernacular feedback sentiment parsing and post-mortem
synthesis for the population-weighted quorum resolution engine.

Stage 0 provides only router scaffolding; full endpoints (parse-feedback,
generate-postmortem) are implemented under Tasks 4.3.1 / 4.3.2.
"""

from fastapi import APIRouter
from core.config import settings

router = APIRouter(prefix="/api/v1/ai", tags=["Quorum NLP"])


@router.get("/quorum-nlp/status")
async def quorum_nlp_status():
    """
    Lightweight status stub confirming the Quorum NLP router is mounted.
    Full sentiment parsing / post-mortem synthesis endpoints land in Stage 3.
    """
    return {
        "mock_mode": settings.MOCK_INFERENCE,
        "router": "quorum_nlp",
        "status": "scaffolded",
    }

