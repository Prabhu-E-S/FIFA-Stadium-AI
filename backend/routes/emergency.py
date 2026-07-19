from fastapi import APIRouter, HTTPException
from models.request_models import AgentQueryRequest
from models.response_models import EmergencyResponse
from agents.emergency_agent import EmergencyAgent
from utils.logger import log_agent_execution, log_error
import time

router = APIRouter()
agent = EmergencyAgent()

@router.post("/emergency", response_model=EmergencyResponse)
async def route_emergency(payload: AgentQueryRequest = None):
    try:
        start_time = time.time()
        query_val = payload.query if payload else None
        result = agent.process(query_val)
        duration = time.time() - start_time
        log_agent_execution("EmergencyAgent", duration, {"query": query_val})
        return result
    except Exception as e:
        log_error("Emergency Route", e)
        raise HTTPException(status_code=500, detail=str(e))
