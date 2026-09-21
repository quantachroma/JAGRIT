import pytest


@pytest.mark.parametrize(
    "fixture_name, complaint",
    [
        ("Palamu Borewell", "The community borewell has stopped supplying water."),
        ("Khunti Lac", "Lac growers need help with a recurring crop disease."),
        ("Chaibasa Solar", "The solar pump panel is not charging and the pump fails."),
        ("Dhanbad Mine Runoff", "Mine runoff is discoloring a nearby stream after rain."),
    ],
)
def test_prd_fixture_triage_smoke(client, fixture_name, complaint):
    # Coarse smoke test only; this does not assert a particular classification outcome.
    response = client.post("/api/v1/ai/triage", json={"text": f"{fixture_name}: {complaint}"})

    assert response.status_code == 200
    assert response.json()["complexity_tier"] in {
        "TYPE_A_CIVIC_ROUTINE",
        "TYPE_A_LOW_CONFIDENCE",
        "TYPE_B_APPLIED_RND",
    }