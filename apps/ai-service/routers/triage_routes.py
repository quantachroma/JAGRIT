from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from services.classifier_agent import SocietalProblemClassifier

router = APIRouter(tags=["Zero-Shot Triage & Multi-Criteria Prioritizer"])
classifier = SocietalProblemClassifier()

class TriageRequest(BaseModel):
    title: str
    description: str
    district: Optional[str] = "Ranchi"


class PostmortemRequest(BaseModel):
    project_id: str
    dpr_summary: str
    failure_notes: str
    test_logs: str


class PostmortemResponse(BaseModel):
    project_id: str
    failure_type: str
    root_cause_analysis: str
    attempted_solution_summary: str
    lessons_learned: str
    escalate_to_national_hackathon: bool


@router.post("/generate-postmortem", response_model=PostmortemResponse)
async def generate_postmortem(payload: PostmortemRequest):
    """Synthesize failure evidence into a deterministic project postmortem."""
    evidence = " ".join(
        [payload.failure_notes, payload.test_logs, payload.dpr_summary]
    ).lower()
    major_failure_keywords = [
        "catastrophic",
        "unsafe",
        "unusable",
        "failed government project",
        "complete failure",
        "system failure",
    ]
    is_major_failure = any(keyword in evidence for keyword in major_failure_keywords)
    failure_type = "MAJOR_FAILURE" if is_major_failure else "MINOR_FAILURE"

    return PostmortemResponse(
        project_id=payload.project_id,
        failure_type=failure_type,
        root_cause_analysis=(
            f"The project evidence indicates a {failure_type.lower().replace('_', ' ')}. "
            f"Failure notes: {payload.failure_notes or 'No failure notes provided.'} "
            f"Test evidence: {payload.test_logs or 'No test logs provided.'}"
        ),
        attempted_solution_summary=(
            f"The team attempted the approach described in the DPR: "
            f"{payload.dpr_summary or 'No DPR summary provided.'}"
        ),
        lessons_learned=(
            "Validate failure conditions with staged field tests, document measurable "
            "acceptance criteria, and incorporate observed evidence before redeployment."
        ),
        escalate_to_national_hackathon=is_major_failure,
    )

@router.post("/triage-classify")
async def classify_and_prioritize(payload: TriageRequest):
    combined_text = f"{payload.title} {payload.description}"

    # 1. Deep Extraction (Async)
    extracted = await classifier.extract_information(payload.title, payload.description, payload.district)

    # 2. Multi-Criteria Prioritization
    priority = classifier.calculate_priority(extracted, combined_text)

    is_rnd = extracted.resolution_tier == "TIER_3_APPLIED_RND"

    return {
        "category_type": "HEI_RESEARCH" if is_rnd else "CIVIC_ROUTINE",
        "detected_domain": "Water Sanitation & Toxic Metal Filtration" if "arsenic" in combined_text.lower() or "fluoride" in combined_text.lower() or "iron" in combined_text.lower() else "Rural Livelihoods & Agritech",
        "resolution_tier": extracted.resolution_tier,
        "suggested_action": "BROADCAST_TO_QUALIFIED_HEIS" if is_rnd else "ROUTE_TO_ULB_JHARSEWA_API",
        "suggested_budget_pool_inr": 350000.0 if is_rnd else 0.0,
        "extraction": extracted.model_dump(),
        "prioritization": priority.model_dump()
    }


class MatchRequest(BaseModel):
    challenge_id: str
    description: str
    domain: Optional[str] = "Water Sanitation"
    lat: Optional[float] = 23.8
    lon: Optional[float] = 84.2


class WbsRequest(BaseModel):
    project_id: str
    challenge_id: str


@router.post("/wbs-timeline")
async def generate_wbs_timeline(payload: WbsRequest):
    return {
        "project_id": payload.project_id,
        "challenge_id": payload.challenge_id,
        "phases": [
            {"phase": "DESIGN", "duration_days": 14},
            {"phase": "BUILD", "duration_days": 30},
            {"phase": "FIELD_TEST", "duration_days": 45},
        ],
        "mode": "M5_DETERMINISTIC_ENGINE",
    }


@router.post("/match-universities")
@router.post("/api/v1/ai/match-universities")
async def match_universities(payload: MatchRequest):
    """Return deterministic institutional matches for a challenge."""
    return {
        "challenge_id": payload.challenge_id,
        "matched_universities": [
            {
                "university_id": "bit-mesra-01",
                "name": "Birla Institute of Technology, Mesra",
                "overall_match_score": 94,
                "spider_data": {
                    "lab_capability": 95,
                    "faculty_patents": 90,
                    "geographic_proximity": 85,
                    "track_record": 98,
                    "student_pool": 92,
                },
                "explainability_reasons": [
                    "NABL Accredited Environmental Chemistry Lab (+35%)",
                    "Rural livelihood and agritech prototyping capability (+30%)",
                    "Jharkhand field deployment proximity (+15%)",
                    "Track record of successfully deployed projects (+14%)",
                ],
            },
            {
                "university_id": "nit-jsr-02",
                "name": "National Institute of Technology, Jamshedpur",
                "overall_match_score": 82,
                "spider_data": {
                    "lab_capability": 80,
                    "faculty_patents": 75,
                    "geographic_proximity": 70,
                    "track_record": 85,
                    "student_pool": 90,
                },
                "explainability_reasons": [
                    "Advanced materials and fabrication facilities (+30%)",
                    "Mechanical prototyping capacity for rural pilot rigs (+25%)",
                ],
            },
        ],
    }