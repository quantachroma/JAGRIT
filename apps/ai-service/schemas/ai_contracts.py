from typing import Optional

from pydantic import BaseModel, Field


class ErrorResponse(BaseModel):
    detail: str


class QuorumFeedbackRequest(BaseModel):
    feedback_text: str
    is_negative_vote: bool = True


class QuorumFeedbackResponse(BaseModel):
    is_critical_defect: bool
    classification: str
    matched_indicators: list[str]


class PostmortemRequest(BaseModel):
    district: str
    problem_domain: str
    initial_dpr_summary: str
    bench_test_data: Optional[str] = None
    citizen_complaint_summary: Optional[str] = None
    evaluator_inspection_notes: Optional[str] = None
    pass_rate_percentage: float


class PostmortemResponse(BaseModel):
    failure_mode: str
    root_cause_analysis: str
    preserved_engineering_directive: str
    pan_india_escalation_flag: bool


class BlueprintSerializeRequest(BaseModel):
    project_id: str
    resolution_percentage: float
    bom_data: dict
    cad_links: list[str] = Field(default_factory=list)
    sop_url: Optional[str] = None
    nabl_lab_cert_url: Optional[str] = None


class BlueprintSerializeResponse(BaseModel):
    project_id: str
    blueprint_package: dict
    replication_window_days: int

