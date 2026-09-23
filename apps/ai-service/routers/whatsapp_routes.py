"""WhatsApp Cloud API webhook handlers."""

import json
import logging

from fastapi import APIRouter, Query, Request, status
from fastapi.responses import PlainTextResponse

from core.config import settings

logger = logging.getLogger("jagrit.ai.whatsapp")

router = APIRouter()


@router.get(
    "/whatsapp",
    summary="WhatsApp webhook verification handshake",
)
async def whatsapp_webhook_verification(
    hub_mode: str | None = Query(default=None, alias="hub.mode"),
    hub_verify_token: str | None = Query(default=None, alias="hub.verify_token"),
    hub_challenge: str | None = Query(default=None, alias="hub.challenge"),
):
    """Complete Meta's challenge-response verification handshake."""
    expected_token = getattr(settings, "WHATSAPP_VERIFY_TOKEN", "")
    if hub_mode == "subscribe" and hub_verify_token == expected_token and hub_challenge:
        logger.info("WhatsApp webhook verified successfully")
        return PlainTextResponse(content=hub_challenge, status_code=status.HTTP_200_OK)

    logger.warning("WhatsApp webhook verification failed: mode=%s", hub_mode)
    return PlainTextResponse(content="Verification failed", status_code=status.HTTP_403_FORBIDDEN)


@router.post(
    "/whatsapp",
    summary="WhatsApp webhook incoming event receiver",
)
async def whatsapp_webhook_event(request: Request):
    """Acknowledge text, voice, image, and location webhook events."""
    try:
        body = await request.json()
    except (json.JSONDecodeError, ValueError):
        body = {}

    message_types = []
    for entry in body.get("entry", []) if isinstance(body, dict) else []:
        for change in entry.get("changes", []) if isinstance(entry, dict) else []:
            value = change.get("value", {}) if isinstance(change, dict) else {}
            for message in value.get("messages", []) if isinstance(value, dict) else []:
                if isinstance(message, dict):
                    message_types.append(message.get("type", "unknown"))

    logger.info("WhatsApp webhook event received; message types=%s", message_types)
    return {"status": "success"}

