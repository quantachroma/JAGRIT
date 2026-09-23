import math

from fastapi import APIRouter

from core.config import (
    CANDIDATE_GATE_COSINE_SIM,
    CANDIDATE_GATE_DISTANCE_M,
    COMPOSITE_D_MERGE_THRESHOLD,
    GEO_KERNEL_SIGMA_M,
    TIME_HARD_CUTOFF_DAYS,
    TIME_KERNEL_TAU_DAYS,
    WEIGHT_DECAY,
    WEIGHT_ECON,
    WEIGHT_ENTITY_SIM,
    WEIGHT_GEO_KERNEL,
    WEIGHT_HEALTH,
    WEIGHT_MEDIA_SIM,
    WEIGHT_POP,
    WEIGHT_TEXT_SIM,
    WEIGHT_TIME_KERNEL,
    WEIGHT_UPVOTES,
    WEIGHT_VULN,
)
from models.loader import get_model
from schemas.dedup import (
    DedupEvalRequest,
    DedupEvalResponse,
    PriorityScoreRequest,
    PriorityScoreResponse,
)

router = APIRouter()


@router.post(
    "/evaluate-composite-dedup",
    response_model=DedupEvalResponse,
    summary="Composite deduplication evaluation",
)
async def evaluate_composite_dedup(payload: DedupEvalRequest):
    model = get_model("deberta")
    prediction = model.predict(
        text=f"{payload.text_a} [SEP] {payload.text_b}",
        candidate_labels=["duplicate", "distinct"],
    )
    text_similarity = float(prediction["scores"][0])
    gate_passed = (
        payload.distance_meters <= CANDIDATE_GATE_DISTANCE_M
        and text_similarity >= CANDIDATE_GATE_COSINE_SIM
    )

    if not gate_passed:
        return DedupEvalResponse(
            candidate_gate_passed=False,
            composite_d=0.0,
            text_similarity=text_similarity,
            k_geo=0.0,
            k_time=0.0,
            decision="CREATE_NEW_MASTER_TICKET",
        )

    k_geo = math.exp(
        -(payload.distance_meters**2) / (2 * GEO_KERNEL_SIGMA_M**2)
    )
    if payload.distance_meters > CANDIDATE_GATE_DISTANCE_M:
        k_geo = 0.0

    k_time = math.exp(-payload.delta_days / TIME_KERNEL_TAU_DAYS)
    if payload.delta_days > TIME_HARD_CUTOFF_DAYS:
        k_time = 0.0

    if k_geo == 0.0 or k_time == 0.0:
        composite_d = 0.0
    else:
        composite_d = (
            WEIGHT_TEXT_SIM * text_similarity
            + WEIGHT_GEO_KERNEL * k_geo
            + WEIGHT_TIME_KERNEL * k_time
            + WEIGHT_MEDIA_SIM * payload.media_sim
            + WEIGHT_ENTITY_SIM * payload.entity_overlap
        )

    decision = (
        "MERGE_INTO_MASTER_CLUSTER"
        if composite_d >= COMPOSITE_D_MERGE_THRESHOLD
        else "CREATE_NEW_MASTER_TICKET"
    )
    # Cluster attachment and upvote increments belong to the database layer.
    return DedupEvalResponse(
        candidate_gate_passed=True,
        composite_d=composite_d,
        text_similarity=text_similarity,
        k_geo=k_geo,
        k_time=k_time,
        decision=decision,
    )


@router.post(
    "/compute-priority",
    response_model=PriorityScoreResponse,
    summary="Multi-factor priority score calculation",
)
async def compute_priority(payload: PriorityScoreRequest):
    is_preliminary = payload.verified_upvotes is None
    s_upvotes = (
        0.0
        if is_preliminary
        else min(100.0, (payload.verified_upvotes / 50.0) * 100.0)
    )
    base_score = (
        WEIGHT_HEALTH * payload.s_health
        + WEIGHT_ECON * payload.s_econ
        + WEIGHT_VULN * payload.s_vuln
        + WEIGHT_DECAY * payload.s_decay
        + WEIGHT_POP * payload.s_pop
        + WEIGHT_UPVOTES * s_upvotes
    )

    # Equity categories use the single highest multiplier, rather than stacking.
    if payload.is_pvtg:
        m_equity = 1.30
    elif payload.is_pesa_jurisdiction:
        m_equity = 1.20
    elif payload.is_aspirational_block:
        m_equity = 1.15
    else:
        m_equity = 1.0

    mps = min(100.0, base_score * m_equity)
    if is_preliminary:
        if payload.s_health >= 90:
            t_upvote_hours = 0
        elif mps >= 85:
            t_upvote_hours = 12
        elif mps >= 65:
            t_upvote_hours = 24
        elif mps >= 45:
            t_upvote_hours = 48
        else:
            t_upvote_hours = 72
        return PriorityScoreResponse(
            phase="PRELIMINARY",
            base_score=base_score,
            m_equity=m_equity,
            mps=mps,
            t_upvote_hours=t_upvote_hours,
        )

    if mps >= 85:
        t_bid_days = 3
    elif mps >= 65:
        t_bid_days = 5
    elif mps >= 45:
        t_bid_days = 7
    else:
        t_bid_days = 10
    return PriorityScoreResponse(
        phase="FINAL",
        base_score=base_score,
        m_equity=m_equity,
        mps=mps,
        t_bid_days=t_bid_days,
    )

