# Jagrit AI Service Microservice

FastAPI microservice for civic-tech AI pipelines (multilingual ASR transcription, Vision Transformer defect scanning, NLI zero-shot triage, geospatial & semantic deduplication, WBS timeline synthesis, and sentiment analytics).

## Setup & Local Development

1. Create and activate virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate # On Windows: .\.venv\Scripts\Activate.ps1
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt --extra-index-url https://download.pytorch.org/whl/cpu
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

4. Run the FastAPI development server:
   ```bash
   uvicorn main:app --port 8000 --reload
   ```

## Running the worker

To run background tasks asynchronously (audio transcription, defect scanning, deduplication), run the Celery worker separately:

```bash
celery -A core.celery_app worker --loglevel=info
```

## Running Tests

Execute pytest suite:
```bash
pytest tests/ -v
```

