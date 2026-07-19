import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch
from backend.app import app
from backend.utils.prompt_loader import load_prompt
from backend.agents.orchestrator import OrchestratorAgent

client = TestClient(app)

def test_prompt_loader():
    """
    Asserts template loader throws exception on invalid names
    and successfully swaps query variables in Markdown patterns.
    """
    with pytest.raises(FileNotFoundError):
        load_prompt("non_existent_prompt_template", {})

    res = load_prompt("orchestrator", {"QUERY": "stadium_query_test"})
    assert "stadium_query_test" in res

def test_orchestrator_fallbacks():
    """
    Validates keyword matching triggers appropriate default agent routing
    when Gemini API connection is skipped or timed out.
    """
    agent = OrchestratorAgent()
    
    r1 = agent._get_fallback("collapsed section 10 need urgent doctor help")
    assert "emergency" in r1["selected_agents"]
    
    r2 = agent._get_fallback("where is the elevator ramp wheelchair route")
    assert "accessibility" in r2["selected_agents"]
    
    r3 = agent._get_fallback("gate capacity load levels")
    assert "crowd" in r3["selected_agents"]

@patch("backend.services.gemini_service.gemini_service.generate_json")
def test_orchestrator_agent_mocked(mock_generate):
    """
    Asserts Orchestrator parses response matching schema formats.
    """
    mock_generate.return_value = {
        "intent": "navigation",
        "selected_agents": ["navigation"],
        "message": "Classified as Navigation"
    }
    agent = OrchestratorAgent()
    res = agent.process("Which gate is fastest?")
    assert res["intent"] == "navigation"
    assert "navigation" in res["selected_agents"]

def test_routes_empty_query():
    """
    Validates that sending an empty query returns clean fallback metrics
    rather than causing backend server warnings.
    """
    response = client.post("/api/orchestrator", json={"query": "   "})
    assert response.status_code == 200
    res_json = response.json()
    assert res_json["intent"] == "unknown"
    assert len(res_json["selected_agents"]) == 0
    assert "decision" in res_json
    assert res_json["decision"]["confidence"] == 100

@patch("backend.services.gemini_service.gemini_service.generate_json")
def test_pipeline_routing_mocks(mock_generate):
    """
    Validates multi-agent call routing and consolidation decision aggregation.
    """
    mock_generate.side_effect = [
        # Orchestrator
        {"intent": "navigation", "selected_agents": ["navigation"], "message": "Triggered Navigation"},
        # Navigation subagent
        {"agent": "Navigation", "status": "success", "data": {"gate": "Gate B", "walking_time": "3 min", "crowd": "Low", "status": "Nominal"}},
        # Decision agent
        {"summary": "Test summary route", "recommendation": "Use Gate B route", "priority": "Low", "confidence": 98}
    ]
    
    response = client.post("/api/orchestrator", json={"query": "fastest route to east gate B"})
    assert response.status_code == 200
    res_json = response.json()
    assert res_json["intent"] == "navigation"
    assert "navigation" in res_json["selected_agents"]
    assert len(res_json["sub_agent_responses"]) == 1
    assert res_json["decision"]["recommendation"] == "Use Gate B route"
