import os
import pytest
from fastapi.testclient import TestClient

# Ensure test environment is active
os.environ["ENVIRONMENT"] = "test"
os.environ["MODEL_MOCK_MODE"] = "true"

from main import app
from models.loader import (
    DeBERTaModelLoader,
    ViTModelLoader,
    WhisperModelLoader,
    get_model,
)

client = TestClient(app)


def test_health_endpoint():
    """Verify GET /health returns 200 and expected status."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert "mock_mode" in data
    assert "device" in data
    assert data["mock_mode"] is True


@pytest.mark.parametrize(
    "method,path,expected_stage",
    [
        ("POST", "/api/v1/ai/transcribe", 1),
        ("GET", "/api/v1/webhooks/whatsapp", 1),
        ("POST", "/api/v1/webhooks/whatsapp", 1),
        ("POST", "/api/v1/ai/defect-scan", 2),
        ("POST", "/api/v1/ai/triage", 2),
        ("POST", "/api/v1/ai/embed", 3),
        ("POST", "/api/v1/ai/evaluate-composite-dedup", 3),
        ("POST", "/api/v1/ai/compute-priority", 3),
        ("POST", "/api/v1/ai/generate-wbs-timeline", 4),
        ("POST", "/api/v1/ai/match-universities", 4),
    ],
)
def test_stub_routes_return_501(method: str, path: str, expected_stage: int):
    """Verify that the pre-Stage-5 scaffold endpoints retain their Stage markers."""
    if method == "GET":
        response = client.get(path)
    elif method == "POST":
        response = client.post(path)
    else:
        pytest.fail(f"Unsupported method: {method}")

    assert response.status_code == 501
    body = response.json()
    assert body == {"detail": f"Not implemented — Stage {expected_stage} pending"}


def test_model_loader_factory_in_mock_mode():
    """Verify that get_model returns mock instances with expected call signatures in mock mode."""
    whisper = get_model("whisper")
    vit = get_model("vit")
    deberta = get_model("deberta")

    # Whisper mock contract
    whisper_res = whisper.transcribe("fake_path.wav")
    assert whisper_res["text"] == "[MOCK TRANSCRIPTION]"
    assert whisper_res["language"] == "hi"

    # ViT mock contract
    vit_res = vit.predict(None)
    assert "defects" in vit_res
    assert vit_res["is_defective"] is True

    # DeBERTa mock contract
    deberta_res = deberta.predict("sample complaint text")
    assert "labels" in deberta_res
    assert "scores" in deberta_res

