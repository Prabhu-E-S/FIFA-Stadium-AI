from fastapi import APIRouter, HTTPException
from backend.models.request_models import OrchestratorRequest
from backend.models.response_models import OrchestratorResponse
from backend.agents.orchestrator import OrchestratorAgent
from backend.agents.navigation_agent import NavigationAgent
from backend.agents.crowd_agent import CrowdAgent
from backend.agents.emergency_agent import EmergencyAgent
from backend.agents.accessibility_agent import AccessibilityAgent
from backend.agents.decision_agent import DecisionAgent
from backend.utils.logger import log_agent_execution, log_error, logger
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
        
        # 1. Guard against empty queries
        query_strip = payload.query.strip()
        if not query_strip:
            return {
                "intent": "unknown",
                "selected_agents": [],
                "message": "Empty operational command query received.",
                "sub_agent_responses": [],
                "decision": {
                    "summary": "No query entered. Pipeline executing fallback standard directives.",
                    "recommendation": "Provide details on routing, sector load density, or accessibility queries.",
                    "priority": "Low",
                    "confidence": 100
                }
            }

        # 2. Intent Detection
        try:
            orchestrator_res = orchestrator_agent.process(query_strip)
        except Exception as e:
            log_error("OrchestratorAgent Classification Error", e)
            orchestrator_res = {"intent": "unknown", "selected_agents": [], "message": "Failed to classify intent."}

        selected_agents = orchestrator_res.get("selected_agents", [])
        intent = orchestrator_res.get("intent", "unknown")
        message = orchestrator_res.get("message", "")
        
        # 3. Executing Selected Sub-Agents with Isolation
        sub_agent_responses = []
        
        for agent_name in selected_agents:
            sub_start = time.time()
            try:
                if agent_name == "navigation":
                    data = navigation_agent.process(query_strip)
                    sub_agent_responses.append(data)
                    log_agent_execution("NavigationAgent", time.time() - sub_start, {"query": query_strip})
                elif agent_name == "crowd":
                    data = crowd_agent.process(query_strip)
                    sub_agent_responses.append(data)
                    log_agent_execution("CrowdAgent", time.time() - sub_start, {"query": query_strip})
                elif agent_name == "emergency":
                    data = emergency_agent.process(query_strip)
                    sub_agent_responses.append(data)
                    log_agent_execution("EmergencyAgent", time.time() - sub_start, {"query": query_strip})
                elif agent_name == "accessibility":
                    data = accessibility_agent.process(query_strip)
                    sub_agent_responses.append(data)
                    log_agent_execution("AccessibilityAgent", time.time() - sub_start, {"query": query_strip})
            except Exception as sub_ex:
                logger.error(f"Isolated sub-agent {agent_name} process failure: {str(sub_ex)}")
                sub_agent_responses.append({
                    "agent": agent_name.capitalize(),
                    "status": "warning",
                    "data": {
                        "message": f"Subagent error. Standby metrics active.",
                        "error": str(sub_ex)
                    }
                })

        # 4. Decision Agent Reasoning with Fallback containment
        dec_start = time.time()
        try:
            decision_res = decision_agent.process(query_strip, sub_agent_responses)
            log_agent_execution("DecisionAgent", time.time() - dec_start, {"query": query_strip, "outputs_count": len(sub_agent_responses)})
        except Exception as dec_ex:
            logger.error(f"DecisionAgent reasoning failed: {str(dec_ex)}")
            decision_res = {
                "summary": "AI reasoning failed. Falling back to default directive.",
                "recommendation": "MetLife operations center advises standard ingress flows. Monitor manual override logs.",
                "priority": "Medium",
                "confidence": 75
            }

        duration = time.time() - start_time
        log_agent_execution("OrchestratorAgent (Pipeline)", duration, {"query": query_strip, "intent": intent})
        
        return {
            "intent": intent,
            "selected_agents": selected_agents,
            "message": message,
            "sub_agent_responses": sub_agent_responses,
            "decision": decision_res
        }
        
    except Exception as e:
        log_error("Orchestrator Pipeline Route Fatal Error", e)
        raise HTTPException(status_code=500, detail=str(e))

