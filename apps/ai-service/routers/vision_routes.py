"""
Vision (ViT) Routes
Handles infrastructure defect scanning from citizen-submitted images
(e.g. cracked roads, damaged solar pumps, storage facility defects).
"""

from fastapi import APIRouter, UploadFile, File
from core.config import settings

router = APIRouter(prefix="/api/v1/ai", tags=["Vision"])


@router.post("/defect-scan")
async def defect_scan(image: UploadFile = File(None)):
    """
    Run a Vision Transformer (ViT) based defect/laser scan on an
    uploaded infrastructure image.

    In MOCK_INFERENCE mode, returns deterministic stubbed bounding
    boxes and defect labels representative of common Jharkhand
    infrastructure issues (e.g. Khunti lac storage cracks).
    """
    if settings.MOCK_INFERENCE:
        return {
            "mock_mode": True,
            "image_width": 1024,
            "image_height": 768,
            "detections": [
                {
                    "label": "Iron Effluent",
                    "confidence": 0.94,
                    "bounding_box": {"x_min": 280, "y_min": 180, "x_max": 620, "y_max": 540},
                },
                {
                    "label": "structural_crack",
                    "confidence": 0.91,
                    "bounding_box": {"x_min": 120, "y_min": 340, "x_max": 410, "y_max": 520},
                },
                {
                    "label": "water_seepage",
                    "confidence": 0.78,
                    "bounding_box": {"x_min": 500, "y_min": 100, "x_max": 690, "y_max": 260},
                },
                {
                    "label": "corroded_metal_fixture",
                    "confidence": 0.65,
                    "bounding_box": {"x_min": 60, "y_min": 600, "x_max": 220, "y_max": 720},
                },
            ],
            "severity_estimate": "MODERATE",
            "filename": image.filename if image else None,
        }

    # TODO: integrate real ViT-based inference pipeline here.
    return {
        "mock_mode": False,
        "image_width": 0,
        "image_height": 0,
        "detections": [],
        "severity_estimate": "UNKNOWN",
        "filename": image.filename if image else None,
    }

