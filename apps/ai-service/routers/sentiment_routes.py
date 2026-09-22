from fastapi import APIRouter, HTTPException, status

from core.config import settings
from models.loader import get_model
from schemas.ai_contracts import (
    BlueprintSerializeRequest,
    BlueprintSerializeResponse,
    PostmortemRequest,
    PostmortemResponse,
    QuorumFeedbackRequest,
    QuorumFeedbackResponse,
)

router = APIRouter()


@router.post(
    "/parse-quorum-feedback",
    response_model=QuorumFeedbackResponse,
    summary="Quorum feedback sentiment parsing",
)
async def parse_quorum_feedback(payload: QuorumFeedbackRequest) -> QuorumFeedbackResponse:
    critical_hypothesis = (
        "Complete system breakdown, contaminated water, zero water pressure, or an electrical fire hazard."
    )
    cosmetic_hypothesis = (
        "A stiff handle, scratched paint, minor dripping, or an aesthetic preference with no functional impact."
    )
    if settings.MODEL_MOCK_MODE:
        text = payload.feedback_text.lower()
        critical_terms = ["contaminated", "dead", "fire", "stopped working", "no water", "zero pressure"]
        cosmetic_terms = ["scratch", "tight", "color", "minor drip", "stiff handle"]
        critical_matches = [term for term in critical_terms if term in text]
        cosmetic_matches = [term for term in cosmetic_terms if term in text]
        is_critical_defect = len(critical_matches) > len(cosmetic_matches)
        return QuorumFeedbackResponse(
            is_critical_defect=is_critical_defect,
            classification=("CRITICAL_SYSTEM_DEFECT" if is_critical_defect else "COSMETIC_GRIEVANCE"),
            matched_indicators=critical_matches if is_critical_defect else cosmetic_matches,
        )

    result = get_model("deberta").predict(
        payload.feedback_text,
        candidate_labels=[critical_hypothesis, cosmetic_hypothesis],
    )
    scores = {
        str(label): float(score)
        for label, score in zip(result.get("labels", []), result.get("scores", []))
    }
    is_critical_defect = scores.get(critical_hypothesis, 0.0) > scores.get(cosmetic_hypothesis, 0.0)
    return QuorumFeedbackResponse(
        is_critical_defect=is_critical_defect,
        classification=("CRITICAL_SYSTEM_DEFECT" if is_critical_defect else "COSMETIC_GRIEVANCE"),
        matched_indicators=[],
    )


@router.post(
    "/generate-postmortem",
    response_model=PostmortemResponse,
    summary="Project postmortem generation",
)
async def generate_postmortem(payload: PostmortemRequest) -> PostmortemResponse:
    prompt = (
        f"[MOCK] Failure mode: {payload.problem_domain} system fault in {payload.district}. "
        f"Root cause analysis: {payload.initial_dpr_summary}. "
        f"Preserved engineering directive: validate the repair against bench and citizen evidence."
    )
    generated = get_model("text_gen").generate(prompt)
    notes = (payload.evaluator_inspection_notes or "").lower()
    escalation_terms = ["beyond state capability", "national", "escalate"]
    # Placeholder heuristic: the PRD leaves the precise pan-India trigger undefined.
    pan_india_escalation_flag = payload.pass_rate_percentage < 40.0 and any(
        term in notes for term in escalation_terms
    )
    return PostmortemResponse(
        failure_mode=generated,
        root_cause_analysis=generated,
        preserved_engineering_directive=generated,
        pan_india_escalation_flag=pan_india_escalation_flag,
    )


@router.post(
    "/serialize-blueprint",
    response_model=BlueprintSerializeResponse,
    summary="Blueprint serialization",
)
async def serialize_blueprint(
    payload: BlueprintSerializeRequest,
) -> BlueprintSerializeResponse:
    if payload.resolution_percentage != 100.0:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Blueprint serialization requires a 100% resolved project.",
        )
    return BlueprintSerializeResponse(
        project_id=payload.project_id,
        blueprint_package={
            "bom_data": payload.bom_data,
            "cad_links": payload.cad_links,
            "sop_url": payload.sop_url,
            "nabl_lab_cert_url": payload.nabl_lab_cert_url,
        },
        replication_window_days=14,
    )

