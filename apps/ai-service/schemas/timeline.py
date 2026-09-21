from typing import Optional

from pydantic import BaseModel


class ExamWindow(BaseModel):
    start_date: str
    end_date: str


class TimelineRequest(BaseModel):
    complexity_tier: str
    project_start_date: str
    is_escalation_phase_2: bool = False
    original_budget_inr: Optional[float] = None
    exam_windows: list[ExamWindow] = []


class RoundSchedule(BaseModel):
    round_number: int
    planned_days: int
    start_date: str
    end_date: str
    exam_buffer_days_added: int


class TimelineResponse(BaseModel):
    complexity_tier: str
    round_1: int
    round_2: int
    round_3: int
    total_days: int
    schedule: list[RoundSchedule]
    scope_expansion: Optional[dict] = None


class HScorePenaltyRequest(BaseModel):
    base_h_score: float
    college_match_percentage: float
    ignored_bids_count: int


class HScorePenaltyResponse(BaseModel):
    penalty_applicable: bool
    new_h_score: float