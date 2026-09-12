"""
Quorum NLP Routes
Handles Stage 3 vernacular feedback sentiment parsing and post-mortem
synthesis for the population-weighted quorum resolution engine.

Stage 0 provides only router scaffolding; full endpoints (parse-feedback,
generate-postmortem) are implemented under Tasks 4.3.1 / 4.3.2.
"""

from typing import Optional

from fastapi import APIRouter
from pydantic import BaseModel
from core.config import settings

router = APIRouter(prefix="/api/v1/ai", tags=["Quorum NLP"])


class FeedbackParseRequest(BaseModel):
    feedback_text: str
    project_id: str


class FeedbackParseResponse(BaseModel):
    project_id: str
    feedback_text: str
    classification: str
    is_critical_defect: bool
    action: str
    explanation: Optional[str] = None


@router.post("/parse-feedback", response_model=FeedbackParseResponse)
async def parse_feedback(payload: FeedbackParseRequest):
    """Classify citizen feedback as a critical defect or cosmetic grievance."""
    text = payload.feedback_text.lower()
    critical_keywords = ["laal paani", "choke", "kharab", "broken"]
    is_critical_defect = any(keyword in text for keyword in critical_keywords)

    if is_critical_defect:
        return FeedbackParseResponse(
            project_id=payload.project_id,
            feedback_text=payload.feedback_text,
            classification="CRITICAL_DEFECT",
            is_critical_defect=True,
            action="TRIGGER_45_DAY_REPAIR_SPRINT",
            explanation="The feedback indicates a severe system failure requiring iterative repair.",
        )

    return FeedbackParseResponse(
        project_id=payload.project_id,
        feedback_text=payload.feedback_text,
        classification="COSMETIC_GRIEVANCE",
        is_critical_defect=False,
        action="CLOSE_TICKET_WITH_MAINTENANCE_NOTICE",
        explanation="The feedback does not indicate a critical system defect.",
    )


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

