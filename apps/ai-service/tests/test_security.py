"""
Unit tests for core.security — Fernet phone encryption.
"""

import pytest
from cryptography.fernet import InvalidToken

from core.security import decrypt_phone, encrypt_phone, reset_fernet


class TestPhoneEncryption:
    """Verify encrypt → decrypt round-trip and error cases."""

    def test_roundtrip_basic(self):
        """encrypt_phone followed by decrypt_phone returns the original."""
        phone = "+919876543210"
        token = encrypt_phone(phone)
        assert isinstance(token, str)
        assert token != phone  # must not be plaintext
        assert decrypt_phone(token) == phone

    def test_roundtrip_empty_string(self):
        """Edge case: empty string should round-trip cleanly."""
        token = encrypt_phone("")
        assert decrypt_phone(token) == ""

    def test_roundtrip_unicode(self):
        """Non-ASCII characters should survive the round-trip."""
        phone = "+91 ९८७६५४३२१०"
        assert decrypt_phone(encrypt_phone(phone)) == phone

    def test_ciphertext_differs_each_call(self):
        """Fernet uses a timestamp + random IV, so two encryptions differ."""
        phone = "+919876543210"
        t1 = encrypt_phone(phone)
        t2 = encrypt_phone(phone)
        assert t1 != t2  # different ciphertexts
        assert decrypt_phone(t1) == decrypt_phone(t2) == phone

    def test_decrypt_garbage_raises(self):
        """Decrypting invalid input must raise InvalidToken."""
        with pytest.raises(Exception):
            decrypt_phone("this-is-not-a-valid-fernet-token")

    def test_missing_key_raises(self):
        """If PHONE_ENCRYPTION_KEY is empty, encrypt_phone raises RuntimeError."""
        import os
        from core.config import settings

        reset_fernet()
        original = settings.PHONE_ENCRYPTION_KEY
        settings.PHONE_ENCRYPTION_KEY = ""
        try:
            with pytest.raises(RuntimeError, match="PHONE_ENCRYPTION_KEY is not set"):
                encrypt_phone("+919876543210")
        finally:
            settings.PHONE_ENCRYPTION_KEY = original
            reset_fernet()

