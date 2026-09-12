"""
Triage Routes
Classifies incoming citizen grievances into categories that determine
routing (e.g. HEI research bidding pool vs direct departmental action).
"""

from fastapi import APIRouter
from pydantic import BaseModel
from core.config import settings

router = APIRouter(prefix="/api/v1/ai", tags=["Triage"])


class TriageRequest(BaseModel):
    text: str = ""
    district: str = ""
    category_hint: str = ""


@router.post("/triage-classify")
async def triage_classify(payload: TriageRequest):
    """
    Classify a grievance's category type for downstream routing.

    In MOCK_INFERENCE mode, returns a deterministic stubbed
    classification (`HEI_RESEARCH`) representative of a groundwater
    fluorosis research challenge in Palamu district.
    """
    if settings.MOCK_INFERENCE:
        return {
            "mock_mode": True,
            "categoryType": "HEI_RESEARCH",
            "subCategory": "GROUNDWATER_QUALITY",
            "confidence": 0.88,
            "district": payload.district or "Palamu",
            "priority": "HIGH",
            "recommended_action": "Route to HEI bidding pool for R&D challenge creation.",
        }

    # TODO: integrate real transformer-based triage classifier here.
    return {
        "mock_mode": False,
        "categoryType": "UNKNOWN",
        "subCategory": "UNKNOWN",
        "confidence": 0.0,
        "district": payload.district,
        "priority": "UNKNOWN",
        "recommended_action": "",
    }

