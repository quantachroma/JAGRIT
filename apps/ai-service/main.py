"""
JAGRIT AI Microservice — FastAPI Application Entrypoint

Role 4 (Applied AI/ML & Ingestion Microservices Lead)
Stage 0: Baseline scaffolding, CORS, modular routing, health & stub endpoints.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.config import settings
from routers import (
    asr_routes,
    vision_routes,
    triage_routes,
    deduplication_routes,
    quorum_nlp_routes,
)

app = FastAPI(
    title="JAGRIT-AI-Core",
    description="Applied AI/ML & Ingestion Microservices for the JAGRIT platform (DHTE Jharkhand).",
    version="0.1.0",
)

# --- CORS Middleware ---
# Allow the citizen PWA, institution portal, and core backend to call
# this microservice directly during local development.
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def warm_up_engine():
    print("JAGRIT AI Engine warmed up and demo-ready on Port 8000")

# --- Modular Routing ---
app.include_router(asr_routes.router)
app.include_router(vision_routes.router)
app.include_router(triage_routes.router)
app.include_router(deduplication_routes.router)
app.include_router(quorum_nlp_routes.router)


@app.get("/health")
async def health():
    """Health check endpoint used by verification scripts and orchestration."""
    return {
        "status": "ok",
        "service": "JAGRIT-AI-Core",
        "mock_mode": settings.MOCK_INFERENCE,
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=settings.PORT, reload=True)

