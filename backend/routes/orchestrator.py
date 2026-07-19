from fastapi import APIRouter, HTTPException
from backend.models.request_models import OrchestratorRequest
from backend.models.response_models import OrchestratorResponse
from backend.agents.orchestrator import OrchestratorAgent
from backend.utils.logger import log_agent_execution, log_error
import time

router = APIRouter()
agent = OrchestratorAgent()

@router.post("/orchestrator", response_model=OrchestratorResponse)
async def route_orchestrator(payload: OrchestratorRequest):
    try:
        start_time = time.time()
        result = agent.process(payload.query)
        duration = time.time() - start_time
        log_agent_execution("OrchestratorAgent", duration, {"query": payload.query, "intent": result.get("intent")})
        return result
    except Exception as e:
        log_error("Orchestrator Route", e)
        raise HTTPException(status_code=500, detail=str(e))
