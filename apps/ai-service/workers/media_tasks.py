"""
JAGRIT AI Microservice — Celery Media Processing Tasks (Stage 1)

Provides async tasks for WhatsApp voice-note ingestion:
  1. Download media from WhatsApp Cloud API
  2. Transcribe using the model loader (Whisper in mock / real mode)
  3. Encrypt the sender phone number before returning the result

All phone numbers are encrypted with Fernet before they touch the broker
payload, and decrypted only inside the worker to minimise PII exposure.

Usage (from a FastAPI route):
    from workers.media_tasks import process_voice_note
    result = process_voice_note.delay(
        media_url="https://...",
        encrypted_phone=encrypt_phone("+919876543210"),
        message_id="wamid.abc123",
    )
"""

import logging
from typing import Any, Dict

from core.celery_app import celery_app
from core.security import decrypt_phone, encrypt_phone

logger = logging.getLogger("jagrit.ai.workers.media_tasks")


@celery_app.task(
    name="workers.media_tasks.process_voice_note",
    bind=True,
    max_retries=3,
    default_retry_delay=30,
    acks_late=True,
)
def process_voice_note(
    self,
    media_url: str,
    encrypted_phone: str,
    message_id: str,
) -> Dict[str, Any]:
    """
    Async Celery task: download a WhatsApp voice note, transcribe it,
    and return the result with the phone number re-encrypted.

    Args:
        media_url: WhatsApp Cloud API media download URL.
        encrypted_phone: Fernet-encrypted sender phone number.
        message_id: WhatsApp message ID for idempotency tracking.

    Returns:
        dict with transcription text, language, confidence, and the
        *encrypted* phone number (never plaintext in the result store).
    """
    logger.info("Processing voice note task: message_id=%s", message_id)

    # --- 1. Decrypt phone for internal processing only ---
    try:
        phone = decrypt_phone(encrypted_phone)
        logger.info(
            "Decrypted phone for message_id=%s (last 4: ...%s)",
            message_id,
            phone[-4:] if len(phone) >= 4 else "****",
        )
    except Exception:
        logger.exception("Failed to decrypt phone for message_id=%s", message_id)
        raise

    # --- 2. Download media (stubbed in Stage 1 — mock mode returns canned audio path) ---
    audio_path = _download_media(media_url, message_id)

    # --- 3. Transcribe ---
    transcription = _transcribe(audio_path)

    # --- 4. Compose result with *re-encrypted* phone ---
    result = {
        "message_id": message_id,
        "encrypted_phone": encrypt_phone(phone),
        "transcription": transcription["text"],
        "language": transcription.get("language", "hi"),
        "segments": transcription.get("segments", []),
        "status": "completed",
    }
    logger.info(
        "Voice note processed: message_id=%s lang=%s",
        message_id,
        result["language"],
    )
    return result


# ---------------------------------------------------------------------------
# Internal helpers (stubbed for Stage 1, fleshed out in Stage 2+)
# ---------------------------------------------------------------------------

def _download_media(media_url: str, message_id: str) -> str:
    """
    Download audio bytes from the WhatsApp Cloud API.

    In Stage 1 / mock mode this returns a placeholder path.
    Stage 2 will add httpx streaming download with exponential back-off.
    """
    logger.info("Downloading media: url=%s message_id=%s", media_url, message_id)
    # Stub: return a placeholder path
    return f"/tmp/jagrit_audio_{message_id}.ogg"


def _transcribe(audio_path: str) -> Dict[str, Any]:
    """
    Run the Whisper model (or mock) against the downloaded audio.

    Imports the model loader lazily to avoid heavy import at worker boot
    if the model hasn't been requested yet.
    """
    from models.loader import get_model

    whisper = get_model("whisper")
    return whisper.transcribe(audio_path)

