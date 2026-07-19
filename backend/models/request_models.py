from pydantic import BaseModel, Field
from typing import Optional, Dict, Any

class OrchestratorRequest(BaseModel):
    query: str = Field(..., description="The user query to be orchestrated")

class AgentQueryRequest(BaseModel):
    query: Optional[str] = Field(None, description="Optional agent query filter")
    context: Optional[Dict[str, Any]] = Field(None, description="Optional operational context")
