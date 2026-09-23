from io import BytesIO

from fastapi import APIRouter, File, UploadFile
from PIL import Image

from models.loader import get_model
from schemas.triage import DefectDetection, DefectScanResponse


router = APIRouter(tags=["Vision Transformer Defect Scanner"])

DEFECT_CLASSES = [
    "Corroded_Pump_Base",
    "Fluorosis_Sediment",
    "Dry_Well",
    "Lac_Pest_Infestation",
    "Fungal_Leaf_Blight",
    "Storage_Rot",
    "Ruptured_Culvert",
    "Pothole_Erosion",
    "Exposed_Rebar",
    # TODO: confirm remaining classes against PRD Appendix.
    *[f"UNLISTED_DEFECT_{index:02d}" for index in range(1, 32)],
]


@router.post("/defect-scan", response_model=DefectScanResponse)
async def scan_defects(image_file: UploadFile = File(...)) -> DefectScanResponse:
    image = Image.open(BytesIO(await image_file.read())).convert("RGB")
    resized_image = image.resize((224, 224))
    result = get_model("vit").predict(resized_image)

    detections = []
    for detection in result.get("defects", []):
        bbox = detection.get("bbox", detection.get("bounding_box", [0.0] * 4))
        detections.append(
            DefectDetection(
                class_name=detection.get("class_name", detection.get("label", "unknown")),
                confidence=float(detection.get("confidence", 0.0)),
                bbox=[float(value) for value in bbox],
            )
        )

    return DefectScanResponse(
        defects_detected_count=len(detections),
        detections=detections,
    )
