from fastapi import APIRouter, HTTPException
from models.request_models import AgentQueryRequest
from models.response_models import AccessibilityResponse
from agents.accessibility_agent import AccessibilityAgent
from utils.logger import log_agent_execution, log_error
import time

router = APIRouter()
agent = AccessibilityAgent()

@router.post("/accessibility", response_model=AccessibilityResponse)
async def route_accessibility(payload: AgentQueryRequest = None):
    try:
        start_time = time.time()
        query_val = payload.query if payload else None
        result = agent.process(query_val)
        duration = time.time() - start_time
        log_agent_execution("AccessibilityAgent", duration, {"query": query_val})
        return result
    except Exception as e:
        log_error("Accessibility Route", e)
        raise HTTPException(status_code=500, detail=str(e))
