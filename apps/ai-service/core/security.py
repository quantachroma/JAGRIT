"""
JAGRIT AI Microservice — Phone Number Encryption (Fernet AES-128-CBC)

Encrypts PII phone numbers before they touch the Celery broker or any
persistent store.  Decryption happens only inside the worker process.

Usage:
    from core.security import encrypt_phone, decrypt_phone

    token = encrypt_phone("+919876543210")
    phone = decrypt_phone(token)
"""

import base64
import hashlib
import logging
from typing import Optional

from cryptography.fernet import Fernet, InvalidToken

from core.config import settings

logger = logging.getLogger("jagrit.ai.security")

# ---------------------------------------------------------------------------
# Key derivation
# ---------------------------------------------------------------------------
_fernet: Optional[Fernet] = None


def _get_fernet() -> Fernet:
    """
    Lazily initialise the Fernet cipher from the configured key.

    If PHONE_ENCRYPTION_KEY is a raw passphrase (not 44-char base64), we
    derive a valid 32-byte URL-safe-base64 key via SHA-256 so that
    operators are not forced to run a keygen command in development.
    """
    global _fernet
    if _fernet is not None:
        return _fernet

    raw_key = settings.PHONE_ENCRYPTION_KEY
    if not raw_key:
        raise RuntimeError(
            "PHONE_ENCRYPTION_KEY is not set.  "
            "Generate one with: python -c "
            "\"from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())\""
        )

    # If the key is already a valid Fernet key (44-char base64), use it directly.
    try:
        _fernet = Fernet(raw_key.encode() if isinstance(raw_key, str) else raw_key)
        return _fernet
    except (ValueError, Exception):
        pass

    # Otherwise derive a deterministic 32-byte key from the passphrase.
    derived = hashlib.sha256(raw_key.encode("utf-8")).digest()
    key_b64 = base64.urlsafe_b64encode(derived)
    _fernet = Fernet(key_b64)
    return _fernet


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def encrypt_phone(phone: str) -> str:
    """
    Encrypt a phone number string and return the Fernet token as a UTF-8
    string suitable for JSON serialisation.
    """
    f = _get_fernet()
    return f.encrypt(phone.encode("utf-8")).decode("utf-8")


def decrypt_phone(token: str) -> str:
    """
    Decrypt a Fernet token back to the original phone number string.

    Raises ``cryptography.fernet.InvalidToken`` if the token is invalid or
    was encrypted with a different key.
    """
    f = _get_fernet()
    return f.decrypt(token.encode("utf-8")).decode("utf-8")


def reset_fernet() -> None:
    """
    Reset the cached Fernet instance.  Useful in tests when the key
    changes between test cases.
    """
    global _fernet
    _fernet = None

