"""
ASR (Automatic Speech Recognition) Routes — Stage 1

Ingests Hindi / Santhali voice notes (WAV/MP3/M4A/OGG).
Returns transcribed text, detected language, confidence, and metadata.
In mock mode, returns deterministic Jharkhand-flavored sample responses.
"""

from typing import Optional
from fastapi import APIRouter, UploadFile, File, HTTPException, status
from fastapi.responses import JSONResponse

router = APIRouter(tags=["Audio & Speech-to-Text"])

@router.post("/transcribe", summary="ASR transcription pipeline")
async def transcribe(file: Optional[UploadFile] = File(None)):
    """
    Ingests Hindi / Santhali voice notes (WAV/MP3/M4A/OGG).
    Returns transcribed text, detected language, and confidence.
    """
    if not file:
        raise HTTPException(status_code=400, detail="No audio file uploaded.")

    # Safe settings import with fallback
    try:
        from core.config import settings
        mock_mode = getattr(settings, "MODEL_MOCK_MODE", True)
    except Exception:
        mock_mode = True

    filename = file.filename.lower() if file.filename else "voice_note.ogg"

    # Real inference mode check
    if not mock_mode:
        return JSONResponse(
            status_code=status.HTTP_501_NOT_IMPLEMENTED,
            content={"detail": "Not implemented — Real inference pending GPU deployment"},
        )

    # High-fidelity realistic Jharkhand fallback for Demo / Offline Mode
    return {
        "text": (
            "Chapekal khon laal daah oḍok kan-a, peene yogya saaf paani nahi mil raha hai "
            "(चापाकल से लाल पानी निकल रहा है, पीने योग्य साफ़ पानी नहीं मिल रहा है)"
        ),
        "detected_language": "sat",
        "language_name": "Santhali",
        "confidence": 0.94,
        "estimated_wer": 0.11,
        "audio_duration_seconds": 6.8,
        "filename": filename,
    }