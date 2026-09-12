"""
ASR (Automatic Speech Recognition) Routes
Handles Hindi/Santhali voice transcription for citizen grievance ingestion.
"""

from fastapi import APIRouter, UploadFile, File
from core.config import settings

router = APIRouter(prefix="/api/v1/ai", tags=["ASR"])


@router.post("/transcribe")
async def transcribe_audio(audio: UploadFile = File(None)):
    """
    Transcribe citizen voice notes (Hindi / Santhali) into text.

    In MOCK_INFERENCE mode, returns a deterministic stubbed transcription
    representative of a Jharkhand citizen grievance report so downstream
    services (triage, deduplication) can be developed without requiring
    a live Whisper/faster-whisper model download.
    """
    if settings.MOCK_INFERENCE:
        return {
            "mock_mode": True,
            "language_detected": "hi",
            "transcription_hindi": "पलामू जिले में भूजल में फ्लोराइड की मात्रा अधिक है, कृपया जांच करें।",
            "transcription_santhali": "ᱯᱟᱞᱟᱢᱩ ᱦᱚᱸ ᱫᱟᱜ ᱨᱮ ᱯᱷᱞᱩᱨᱟᱭᱰ ᱰᱷᱮᱨ ᱢᱮᱱᱟᱜᱼᱟ, ᱫᱟᱭᱟᱠᱟᱛᱮ ᱧᱮᱞ ᱢᱮ ᱾",
            "transcription_english": "There is high fluoride content in groundwater in Palamu district, please investigate.",
            "confidence": 0.94,
            "duration_seconds": 8.2,
            "filename": audio.filename if audio else None,
        }

    # TODO: integrate faster-whisper based real inference pipeline here.
    return {
        "mock_mode": False,
        "language_detected": "hi",
        "transcription_hindi": "",
        "transcription_santhali": "",
        "transcription_english": "",
        "confidence": 0.0,
        "duration_seconds": 0.0,
        "filename": audio.filename if audio else None,
    }

