from datetime import date, timedelta

from fastapi import APIRouter, HTTPException, status

from core.config import (
    H_SCORE_INVITE_MATCH_THRESHOLD,
    H_SCORE_PENALTY_PER_IGNORED_BID,
    MAX_EXAM_BUFFER_DAYS,
    SCOPE_EXPANSION_BUDGET_MULTIPLIER,
    SCOPE_EXPANSION_NEP_CREDITS,
    SCOPE_EXPANSION_SPARES_MONTHS,
    TIER_1_ROUNDS,
    TIER_2_ROUNDS,
    TIER_3_ROUNDS,
)
from schemas.timeline import (
    HScorePenaltyRequest,
    HScorePenaltyResponse,
    RoundSchedule,
    TimelineRequest,
    TimelineResponse,
)

router = APIRouter()


@router.post(
    "/generate-timeline",
    response_model=TimelineResponse,
    summary="WBS timeline generation",
)
async def generate_timeline(request: TimelineRequest):
    tier_rounds = {
        "TIER_1_DIGITAL_PROCESS": TIER_1_ROUNDS,
        "TIER_2_MECHANICAL_AGRO": TIER_2_ROUNDS,
        "TIER_3_APPLIED_RND": TIER_3_ROUNDS,
    }.get(request.complexity_tier)
    if tier_rounds is None:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Invalid complexity_tier")
    if request.is_escalation_phase_2 and request.original_budget_inr is None:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="original_budget_inr is required for escalation phase 2")

    try:
        round_start = date.fromisoformat(request.project_start_date)
        exam_windows = [
            (date.fromisoformat(window.start_date), date.fromisoformat(window.end_date))
            for window in request.exam_windows
        ]
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Dates must be valid ISO 8601 dates") from exc

    for exam_start, exam_end in exam_windows:
        if exam_end < exam_start:
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Exam window end_date must not precede start_date")

    schedule = []
    total_buffer_days = 0
    for round_number in range(1, 4):
        planned_days = tier_rounds[f"round_{round_number}"]
        round_end = round_start + timedelta(days=planned_days)
        round_buffer_days = 0
        for exam_start, exam_end in exam_windows:
            overlap_start = max(round_start, exam_start)
            overlap_end = min(round_end, exam_end)
            if overlap_start <= overlap_end and total_buffer_days < MAX_EXAM_BUFFER_DAYS:
                overlap_days = (overlap_end - overlap_start).days + 1
                added_buffer_days = min(overlap_days, MAX_EXAM_BUFFER_DAYS - total_buffer_days)
                round_buffer_days += added_buffer_days
                total_buffer_days += added_buffer_days
        round_end += timedelta(days=round_buffer_days)
        schedule.append(
            RoundSchedule(
                round_number=round_number,
                planned_days=planned_days,
                start_date=round_start.isoformat(),
                end_date=round_end.isoformat(),
                exam_buffer_days_added=round_buffer_days,
            )
        )
        round_start = round_end + timedelta(days=1)

    scope_expansion = None
    if request.is_escalation_phase_2:
        scope_expansion = {
            "budget_inr": request.original_budget_inr * SCOPE_EXPANSION_BUDGET_MULTIPLIER,
            "target_coverage": "2 adjacent hamlets instead of 1 borewell",
            "telemetry_mandate": "Digital IoT water sensors with 24/7 live state feed",
            "spares_kit_months": SCOPE_EXPANSION_SPARES_MONTHS,
            "student_nep_credits": SCOPE_EXPANSION_NEP_CREDITS,
        }

    return TimelineResponse(
        complexity_tier=request.complexity_tier,
        round_1=tier_rounds["round_1"],
        round_2=tier_rounds["round_2"],
        round_3=tier_rounds["round_3"],
        total_days=tier_rounds["total"],
        schedule=schedule,
        scope_expansion=scope_expansion,
    )


@router.post(
    "/compute-h-score-penalty",
    response_model=HScorePenaltyResponse,
    summary="Compute H-Score anti-speculation penalty",
)
async def compute_h_score_penalty(request: HScorePenaltyRequest):
    penalty_applicable = request.college_match_percentage >= H_SCORE_INVITE_MATCH_THRESHOLD
    if penalty_applicable:
        new_h_score = max(0, request.base_h_score - (H_SCORE_PENALTY_PER_IGNORED_BID * request.ignored_bids_count))
    else:
        new_h_score = request.base_h_score

    # Persistence and cross-service notification are out of scope for this microservice.
    return HScorePenaltyResponse(
        penalty_applicable=penalty_applicable,
        new_h_score=new_h_score,
    )

