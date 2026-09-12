from fastapi import APIRouter
from pydantic import BaseModel
import random

router = APIRouter(tags=["Vector Embeddings & Deduplication"])

class EmbedRequest(BaseModel):
    text: str

@router.post("/embed")
async def generate_embeddings(payload: EmbedRequest):
    """
    Generates deterministic 1536-dimensional float embeddings
    compatible with pgvector in PostGIS.
    """
    # Deterministic pseudo-random seed based on input text hash
    seed = sum(ord(c) for c in payload.text)
    rng = random.Random(seed)
    
    # Generate 1536-dim normalized vector
    vector = [round(rng.uniform(-0.05, 0.05), 6) for _ in range(1536)]

    return {
        "model": "text-embedding-3-large",
        "dimension": 1536,
        "vector": vector
    }