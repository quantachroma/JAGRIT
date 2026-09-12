"""
Deduplication Routes
Handles semantic + geospatial embedding generation used to detect
duplicate citizen grievance reports within a proximity radius (e.g. 500m).
"""

from fastapi import APIRouter
from pydantic import BaseModel
import hashlib
import struct
from core.config import settings

router = APIRouter(prefix="/api/v1/ai", tags=["Deduplication"])

EMBEDDING_DIM = 1536


class EmbedRequest(BaseModel):
    text: str = ""


def _deterministic_vector(seed_text: str, dim: int = EMBEDDING_DIM) -> list:
    """
    Generate a deterministic, reproducible pseudo-embedding from input
    text using a SHA-256 based seeded stream. This keeps mock responses
    stable across repeated calls with the same input, which is useful
    for deduplication similarity testing without a real model.
    """
    vector = []
    counter = 0
    seed_bytes = seed_text.encode("utf-8") if seed_text else b"jagrit-default-seed"
    while len(vector) < dim:
        digest = hashlib.sha256(seed_bytes + counter.to_bytes(4, "big")).digest()
        # Unpack 8 floats (4 bytes each) per digest chunk, normalized to [-1, 1]
        for i in range(0, len(digest) - 3, 4):
            if len(vector) >= dim:
                break
            (raw,) = struct.unpack(">I", digest[i:i + 4])
            normalized = (raw / 0xFFFFFFFF) * 2 - 1
            vector.append(round(normalized, 6))
        counter += 1
    return vector[:dim]


@router.post("/embed")
async def embed_text(payload: EmbedRequest):
    """
    Generate a 1536-dimensional embedding vector for the input text,
    used for pgvector-based semantic deduplication of grievances.

    In MOCK_INFERENCE mode, returns a deterministic stubbed vector
    (no real sentence-transformers model invoked).
    """
    if settings.MOCK_INFERENCE:
        vector = _deterministic_vector(payload.text)
        return {
            "mock_mode": True,
            "dimensions": EMBEDDING_DIM,
            "embedding": vector,
        }

    # TODO: integrate real sentence-transformers embedding pipeline here.
    return {
        "mock_mode": False,
        "dimensions": EMBEDDING_DIM,
        "embedding": [0.0] * EMBEDDING_DIM,
    }

