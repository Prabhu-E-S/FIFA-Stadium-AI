from fastapi import APIRouter, HTTPException
from backend.models.request_models import OrchestratorRequest
from backend.models.response_models import OrchestratorResponse
from backend.agents.orchestrator import OrchestratorAgent
from backend.agents.navigation_agent import NavigationAgent
from backend.agents.crowd_agent import CrowdAgent
from backend.agents.emergency_agent import EmergencyAgent
from backend.agents.accessibility_agent import AccessibilityAgent
from backend.agents.decision_agent import DecisionAgent
from backend.utils.logger import log_agent_execution, log_error
import time

router = APIRouter()

# Instantiate all agents
orchestrator_agent = OrchestratorAgent()
navigation_agent = NavigationAgent()
crowd_agent = CrowdAgent()
emergency_agent = EmergencyAgent()
accessibility_agent = AccessibilityAgent()
decision_agent = DecisionAgent()

@router.post("/orchestrator", response_model=OrchestratorResponse)
async def route_orchestrator(payload: OrchestratorRequest):
    try:
        start_time = time.time()
        
        # 1. Intent Detection
        orchestrator_res = orchestrator_agent.process(payload.query)
        selected_agents = orchestrator_res.get("selected_agents", [])
        intent = orchestrator_res.get("intent", "unknown")
        message = orchestrator_res.get("message", "")
        
        # 2. Executing Selected Sub-Agents
        sub_agent_responses = []
        
        for agent_name in selected_agents:
            sub_start = time.time()
            if agent_name == "navigation":
                data = navigation_agent.process(payload.query)
                sub_agent_responses.append(data)
                log_agent_execution("NavigationAgent", time.time() - sub_start, {"query": payload.query})
            elif agent_name == "crowd":
                data = crowd_agent.process(payload.query)
                sub_agent_responses.append(data)
                log_agent_execution("CrowdAgent", time.time() - sub_start, {"query": payload.query})
            elif agent_name == "emergency":
                data = emergency_agent.process(payload.query)
                sub_agent_responses.append(data)
                log_agent_execution("EmergencyAgent", time.time() - sub_start, {"query": payload.query})
            elif agent_name == "accessibility":
                data = accessibility_agent.process(payload.query)
                sub_agent_responses.append(data)
                log_agent_execution("AccessibilityAgent", time.time() - sub_start, {"query": payload.query})
        
        # 3. Decision Agent Reasoning
        dec_start = time.time()
        decision_res = decision_agent.process(payload.query, sub_agent_responses)
        log_agent_execution("DecisionAgent", time.time() - dec_start, {"query": payload.query, "outputs_count": len(sub_agent_responses)})
        
        # Log consolidated statistics
        duration = time.time() - start_time
        log_agent_execution("OrchestratorAgent (Pipeline)", duration, {"query": payload.query, "intent": intent})
        
        return {
            "intent": intent,
            "selected_agents": selected_agents,
            "message": message,
            "sub_agent_responses": sub_agent_responses,
            "decision": decision_res
        }
        
    except Exception as e:
        log_error("Orchestrator Pipeline Route Error", e)
        raise HTTPException(status_code=500, detail=str(e))
