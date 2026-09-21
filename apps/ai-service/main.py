"""JAGRIT AI Microservice - FastAPI application entrypoint."""

import logging
import traceback

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from core.config import settings
from routers import (
    asr_routes,
    dedup_routes,
    deduplication_routes,
    quorum_nlp_routes,
    sentiment_routes,
    timeline_routes,
    triage_routes,
    vision_routes,
    whatsapp_routes,
)

logger = logging.getLogger("jagrit.ai.main")
logging.basicConfig(level=logging.INFO)

app = FastAPI(
    title="Jagrit AI Service",
    description="Applied AI/ML & Ingestion Microservices for the JAGRIT platform (DHTE Jharkhand).",
    version="0.1.0",
)

# TODO(security): restrict CORS before production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def warm_up_engine():
    print("JAGRIT AI Engine warmed up and demo-ready on Port 8000")


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception on {request.method} {request.url.path}: {exc}")
    logger.error(traceback.format_exc())
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "Internal server error"},
    )


@app.get("/health")
async def health():
    return {
        "status": "ok",
        "mock_mode": settings.MODEL_MOCK_MODE,
        "device": settings.MODEL_DEVICE,
    }


app.include_router(asr_routes.router, prefix="/api/v1/ai", tags=["asr"])
app.include_router(vision_routes.router, prefix="/api/v1/ai", tags=["vision"])
app.include_router(triage_routes.router, prefix="/api/v1/ai", tags=["triage"])
app.include_router(dedup_routes.router, prefix="/api/v1/ai", tags=["dedup"])
app.include_router(timeline_routes.router, prefix="/api/v1/ai", tags=["timeline"])
app.include_router(sentiment_routes.router, prefix="/api/v1/ai", tags=["sentiment"])
app.include_router(whatsapp_routes.router, prefix="/api/v1/webhooks", tags=["whatsapp"])
app.include_router(
    deduplication_routes.router,
    prefix="/api/v1/ai",
    tags=["deduplication"],
)
app.include_router(quorum_nlp_routes.router, prefix="/api/v1/ai", tags=["quorum-sentiment"])


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)