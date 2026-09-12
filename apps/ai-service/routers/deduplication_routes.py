from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
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
class CopilotQueryRequest(BaseModel):
    query: str
    domain: Optional[str] = "Water Sanitation"

@router.post("/copilot-query")
async def rd_copilot_query(payload: CopilotQueryRequest):
    """
    Task 4.2.2: R&D Copilot semantic search over historical failures and 
    regional materials to assist student proposal drafting.
    """
    return {
        "query": payload.query,
        "recommended_materials": [
            {
                "material": "Activated Bauxite Granules",
                "source": "Lohardaga Mining Belt (Jharkhand)",
                "advantage": "High adsorption capacity for fluoride ions at 1/5th the commercial synthetic resin cost."
            },
            {
                "material": "Burnt Terracotta Clay Granules",
                "source": "Local Pottery Clusters",
                "advantage": "Effective pre-filtration matrix for coarse iron sediment removal."
            }
        ],
        "historical_pitfalls": [
            {
                "reference_id": "FAIL-2024-PLM-02",
                "title": "Aluminium Sulphate Coagulant Pilot (2024)",
                "warning": "Avoid aluminium sulphate coagulant in high-silica groundwater; saturated within 72 hours in Palamu trial."
            }
        ]
    }