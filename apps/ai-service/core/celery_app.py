"""
Celery Application Configuration for Jagrit AI Service

Running the worker:
celery -A core.celery_app worker --loglevel=info
"""

from celery import Celery
from core.config import settings

celery_app = Celery(
    "jagrit_ai_service",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
)

celery_app.conf.update(
    task_routes={
        "workers.media_tasks.*": {"queue": "audio_tasks"},
        "routers.asr_routes.*": {"queue": "audio_tasks"},
        "routers.whatsapp_routes.*": {"queue": "audio_tasks"},
        "routers.vision_routes.*": {"queue": "vision_tasks"},
        "routers.triage_routes.*": {"queue": "vision_tasks"},
        "routers.dedup_routes.*": {"queue": "dedup_tasks"},
        "routers.timeline_routes.*": {"queue": "dedup_tasks"},
        "routers.sentiment_routes.*": {"queue": "dedup_tasks"},
    },
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    timezone="Asia/Kolkata",
    enable_utc=True,
    task_acks_late=True,
    worker_prefetch_multiplier=1,
)

# Auto-discover tasks in the workers package
celery_app.autodiscover_tasks(["workers"])
