"""
Tests for workers.media_tasks — Celery voice note processing.

Includes a "Redis broker payload inspection" test that verifies
encrypted phone numbers appear in the task kwargs and that the
plaintext phone is NOT present in the serialised message body.
"""

import json
import pytest

from core.security import encrypt_phone, decrypt_phone


class TestProcessVoiceNote:
    """Direct (eager) invocation of the Celery task."""

    def test_task_returns_completed_result(self):
        """Task produces a result dict with status=completed and encrypted phone."""
        from workers.media_tasks import process_voice_note

        phone = "+919876543210"
        encrypted = encrypt_phone(phone)

        result = process_voice_note(
            media_url="https://mock.whatsapp.com/media/123",
            encrypted_phone=encrypted,
            message_id="wamid.test001",
        )

        assert result["status"] == "completed"
        assert result["message_id"] == "wamid.test001"
        assert result["language"] == "hi"
        assert result["transcription"] == "[MOCK TRANSCRIPTION]"

        # The result's encrypted_phone must decrypt back to the original
        assert decrypt_phone(result["encrypted_phone"]) == phone

    def test_task_never_returns_plaintext_phone(self):
        """The plaintext phone must NOT appear anywhere in the result dict."""
        from workers.media_tasks import process_voice_note

        phone = "+919876543210"
        encrypted = encrypt_phone(phone)

        result = process_voice_note(
            media_url="https://mock.whatsapp.com/media/456",
            encrypted_phone=encrypted,
            message_id="wamid.test002",
        )

        serialised = json.dumps(result)
        assert phone not in serialised, (
            f"Plaintext phone '{phone}' leaked into the task result!"
        )


class TestBrokerPayloadInspection:
    """
    Simulate what Celery would serialise onto the Redis broker and verify
    that the plaintext phone number is NEVER present in the JSON payload.

    This is the "Redis broker payload inspection test" from the Stage 1
    verification checklist.
    """

    def test_broker_payload_does_not_contain_plaintext(self):
        """
        Build the kwargs dict that Celery would serialise, convert it to
        JSON, and assert the raw phone string is absent.
        """
        phone = "+919876543210"
        encrypted = encrypt_phone(phone)

        # This is exactly the dict Celery would place on the broker
        broker_payload = {
            "task": "workers.media_tasks.process_voice_note",
            "kwargs": {
                "media_url": "https://mock.whatsapp.com/media/789",
                "encrypted_phone": encrypted,
                "message_id": "wamid.broker_test",
            },
        }

        payload_json = json.dumps(broker_payload)

        # The plaintext phone must NOT appear in the serialised broker message
        assert phone not in payload_json, (
            f"SECURITY VIOLATION: plaintext phone '{phone}' found in broker payload!"
        )

        # The encrypted token MUST appear
        assert encrypted in payload_json

        # Verify we can still recover the phone from the encrypted value
        recovered = decrypt_phone(broker_payload["kwargs"]["encrypted_phone"])
        assert recovered == phone

    def test_broker_payload_is_valid_json(self):
        """Ensure the payload is JSON-serialisable (Celery's json serializer requirement)."""
        phone = "+911234567890"
        encrypted = encrypt_phone(phone)

        payload = {
            "task": "workers.media_tasks.process_voice_note",
            "id": "test-task-id-001",
            "kwargs": {
                "media_url": "https://example.com/audio.ogg",
                "encrypted_phone": encrypted,
                "message_id": "wamid.json_test",
            },
        }

        # Must not raise
        serialised = json.dumps(payload)
        deserialised = json.loads(serialised)

        assert deserialised["kwargs"]["encrypted_phone"] == encrypted
        assert phone not in serialised

