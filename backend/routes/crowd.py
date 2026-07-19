from fastapi import APIRouter, HTTPException
from models.request_models import AgentQueryRequest
from models.response_models import CrowdResponse
from agents.crowd_agent import CrowdAgent
from utils.logger import log_agent_execution, log_error
import time

router = APIRouter()
agent = CrowdAgent()

@router.post("/crowd", response_model=CrowdResponse)
async def route_crowd(payload: AgentQueryRequest = None):
    try:
        start_time = time.time()
        query_val = payload.query if payload else None
        result = agent.process(query_val)
        duration = time.time() - start_time
        log_agent_execution("CrowdAgent", duration, {"query": query_val})
        return result
    except Exception as e:
        log_error("Crowd Route", e)
        raise HTTPException(status_code=500, detail=str(e))
