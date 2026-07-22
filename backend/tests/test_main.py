import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_status():
    response = client.get("/api/status")
    assert response.status_code == 200
    data = response.json()
    assert "services" in data
    assert len(data["services"]) > 0

def test_monitor_url_invalid():
    response = client.post("/api/monitor", json={"url": "invalid-url-domain-test.xyz"})
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert "ping_ms" in data
