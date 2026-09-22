from pydantic import BaseModel, Field


class DefectDetection(BaseModel):
    class_name: str
    confidence: float
    bbox: list[float] = Field(min_length=4, max_length=4)


class DefectScanResponse(BaseModel):
    defects_detected_count: int
    detections: list[DefectDetection]
