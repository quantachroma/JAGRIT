from fastapi import APIRouter
from pydantic import BaseModel

from core.config import DOMAIN_TAG_THRESHOLD, TRIAGE_AUTO_ROUTE_THRESHOLD, TRIAGE_ESCALATE_THRESHOLD
from models.loader import get_model
from services.classifier_agent import SocietalProblemClassifier


router = APIRouter(tags=["Zero-Shot Triage & Multi-Criteria Prioritizer"])
classifier = SocietalProblemClassifier()

HYPOTHESIS_A = "Routine municipal sanitation, streetlight, or basic pothole repair work."
HYPOTHESIS_B = "Technical, chemical, biological, or engineering challenge requiring scientific research, hardware prototyping, or university laboratories."
DOMAINS = [
    "Water Resources",
    "Agriculture",
    "Renewable Energy",
    "Environment",
    "Urban Infra",
    "Rural Livelihoods",
    "Public Health",
    "Accessibility",
    "Education",
    "Public Admin Tech",
]


class TriageRequest(BaseModel):
    text: str


def _scores_by_label(result: dict) -> dict[str, float]:
    return {
        str(label): float(score)
        for label, score in zip(result.get("labels", []), result.get("scores", []))
    }


@router.post("/triage")
async def triage(payload: TriageRequest) -> dict:
    # DeBERTa zero-shot scores are treated as complementary probabilities; the
    # mock and the NLI classifier both return a normalized score per candidate.
    model_result = get_model("deberta").predict(
        payload.text,
        candidate_labels=[HYPOTHESIS_B, HYPOTHESIS_A],
    )
    hypothesis_scores = _scores_by_label(model_result)
    p_type_a = hypothesis_scores.get(HYPOTHESIS_A, 0.0)
    p_type_b = hypothesis_scores.get(HYPOTHESIS_B, 0.0)

    if p_type_a >= TRIAGE_AUTO_ROUTE_THRESHOLD:
        complexity_tier = "TYPE_A_CIVIC_ROUTINE"
        auto_routed = True
        target_queue = "MUNICIPAL_ULB_DISPATCH"
        gate_reason = "high_confidence_type_a"
    else:
        auto_routed = False
        target_queue = "EVALUATOR_TRIAGE_QUEUE"
        if p_type_b > TRIAGE_ESCALATE_THRESHOLD:
            complexity_tier = "TYPE_B_APPLIED_RND"
            gate_reason = "type_b_detected"
        else:
            complexity_tier = "TYPE_A_LOW_CONFIDENCE"
            gate_reason = "low_confidence_type_a"

    response = {
        "complexity_tier": complexity_tier,
        "auto_routed": auto_routed,
        "target_queue": target_queue,
        "gate_reason": gate_reason,
        "p_type_a": p_type_a,
        "p_type_b": p_type_b,
    }

    if complexity_tier == "TYPE_B_APPLIED_RND":
        domain_result = get_model("deberta").predict(
            payload.text,
            candidate_labels=DOMAINS,
        )
        domain_probabilities = _scores_by_label(domain_result)
        tagged_domains = [
            domain for domain in DOMAINS
            if domain_probabilities.get(domain, 0.0) >= DOMAIN_TAG_THRESHOLD
        ]
        extracted = await classifier.extract_information("Civic complaint", payload.text, "Unknown")
        priority = classifier.calculate_priority(extracted, payload.text)
        response["domain_probabilities"] = domain_probabilities
        response["tagged_domains"] = tagged_domains
        response["classifier"] = {
            "domain": tagged_domains,
            "subdomains": extracted.root_causes,
            "skills": extracted.vulnerable_subgroups,
            "infrastructure": extracted.location_details,
            "urgency": priority.urgency_score,
            "complexity_tier": complexity_tier,
            "extraction": extracted.model_dump(),
            "prioritization": priority.model_dump(),
        }

    return response
