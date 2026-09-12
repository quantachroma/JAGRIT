"""Stage 4 demo fixture checks for the JAGRIT AI service."""

from pathlib import Path
import inspect
import sys

import httpx


if "app" not in inspect.signature(httpx.Client.__init__).parameters:
    original_httpx_init = httpx.Client.__init__

    def compatible_httpx_init(self, *args, **kwargs):
        kwargs.pop("app", None)
        original_httpx_init(self, *args, **kwargs)

    httpx.Client.__init__ = compatible_httpx_init


from fastapi.testclient import TestClient

SERVICE_ROOT = Path(__file__).resolve().parents[1]
if str(SERVICE_ROOT) not in sys.path:
    sys.path.insert(0, str(SERVICE_ROOT))

from main import app


BASE_URL = "http://testserver"


def assert_success(response, message):
    assert response.status_code == 200, (
        f"{message}: expected HTTP 200, got {response.status_code}: "
        f"{response.text}"
    )


def run_scenario_a(client):
    audio_response = client.post(
        "/api/v1/ai/transcribe",
        files={"file": ("palamu-groundwater.wav", b"demo audio", "audio/wav")},
    )
    assert_success(audio_response, "Palamu transcription")
    audio_result = audio_response.json()
    assert audio_result["detected_language"] == "sat"
    assert audio_result["language_name"] == "Santhali"

    image_response = client.post(
        "/api/v1/ai/defect-scan",
        files={"image": ("palamu-groundwater.jpg", b"demo image", "image/jpeg")},
    )
    assert_success(image_response, "Palamu defect scan")
    detections = image_response.json()["detections"]
    iron_effluent = next(
        detection for detection in detections if detection["label"] == "Iron Effluent"
    )
    assert iron_effluent["bounding_box"]
    print("✅ Scenario A passed: Palamu Groundwater / Santhali + Iron Effluent box")


def run_scenario_b(client):
    triage_response = client.post(
        "/api/v1/ai/triage-classify",
        json={
            "title": "Khunti lac produce storage loss",
            "description": "Lac produce quality drops during rural storage and needs an applied solution.",
            "district": "Khunti",
        },
    )
    assert_success(triage_response, "Khunti triage")
    assert triage_response.json()["category_type"] == "HEI_RESEARCH"

    match_response = client.post(
        "/api/v1/ai/match-universities",
        json={
            "challenge_id": "khunti-lac-001",
            "description": "Develop a low-cost lac produce storage solution.",
            "domain": "Agritech",
            "lat": 23.0,
            "lon": 85.3,
        },
    )
    assert_success(match_response, "Khunti university matching")
    matches = match_response.json()["matched_universities"]
    bit_mesra = next(
        match for match in matches if "Birla Institute of Technology" in match["name"]
    )
    assert bit_mesra["overall_match_score"] >= 90
    print("✅ Scenario B passed: Khunti Lac Produce / HEI research + BIT Mesra >= 90%")


def run_scenario_c(client):
    response = client.post(
        "/api/v1/ai/triage-classify",
        json={
            "title": "Chaibasa pothole",
            "description": "A large pothole is blocking the road near the market.",
            "district": "West Singhbhum",
        },
    )
    assert_success(response, "Chaibasa triage")
    assert response.json()["category_type"] == "CIVIC_ROUTINE"
    print("✅ Scenario C passed: Chaibasa Pothole / civic routine")


def run_scenario_d(client):
    feedback_response = client.post(
        "/api/v1/ai/parse-feedback",
        json={
            "feedback_text": "Laal paani is still coming from the pump.",
            "project_id": "palamu-groundwater-001",
        },
    )
    assert_success(feedback_response, "Quorum feedback parsing")
    feedback_result = feedback_response.json()
    assert feedback_result["classification"] == "CRITICAL_DEFECT"
    assert feedback_result["is_critical_defect"] is True

    postmortem_response = client.post(
        "/api/v1/ai/generate-postmortem",
        json={
            "project_id": "palamu-groundwater-001",
            "dpr_summary": "Installed a community iron filtration unit.",
            "failure_notes": "Complete failure during field deployment.",
            "test_logs": "Unsafe iron levels remained in the output water.",
        },
    )
    assert_success(postmortem_response, "Postmortem generation")
    postmortem_result = postmortem_response.json()
    assert postmortem_result["failure_type"] == "MAJOR_FAILURE"
    assert postmortem_result["escalate_to_national_hackathon"] is True
    print("✅ Scenario D passed: quorum feedback + postmortem escalation")


def main():
    print("\n🚀 JAGRIT AI Stage 4 fixture verification")
    with TestClient(app, base_url=BASE_URL) as client:
        run_scenario_a(client)
        run_scenario_b(client)
        run_scenario_c(client)
        run_scenario_d(client)
    print("🎉 All AI demo scenarios passed successfully.\n")


if __name__ == "__main__":
    main()
