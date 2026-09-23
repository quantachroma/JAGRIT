from typing import Optional

from pydantic import BaseModel


class DedupEvalRequest(BaseModel):
    text_a: str
    text_b: str
    distance_meters: float
    delta_days: float
    media_sim: float
    entity_overlap: float


class DedupEvalResponse(BaseModel):
    candidate_gate_passed: bool
    composite_d: float
    text_similarity: float
    k_geo: float
    k_time: float
    decision: str


class PriorityScoreRequest(BaseModel):
    s_health: float
    s_econ: float
    s_vuln: float
    s_decay: float
    s_pop: float
    verified_upvotes: Optional[int] = None
    is_pvtg: bool = False
    is_pesa_jurisdiction: bool = False
    is_aspirational_block: bool = False


class PriorityScoreResponse(BaseModel):
    phase: str
    base_score: float
    m_equity: float
    mps: float
    t_upvote_hours: Optional[int] = None
    t_bid_days: Optional[int] = None