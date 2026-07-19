from fastapi import APIRouter, HTTPException
from backend.models.request_models import AgentQueryRequest
from backend.models.response_models import NavigationResponse
from backend.agents.navigation_agent import NavigationAgent
from backend.utils.logger import log_agent_execution, log_error
import time

router = APIRouter()
agent = NavigationAgent()

@router.post("/navigation", response_model=NavigationResponse)
async def route_navigation(payload: AgentQueryRequest = None):
    try:
        start_time = time.time()
        query_val = payload.query if payload else None
        result = agent.process(query_val)
        duration = time.time() - start_time
        log_agent_execution("NavigationAgent", duration, {"query": query_val})
        return result
    except Exception as e:
        log_error("Navigation Route", e)
        raise HTTPException(status_code=500, detail=str(e))
