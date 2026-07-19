from pydantic import BaseModel, Field
from typing import List, Optional, Any, Dict

class DecisionResponse(BaseModel):
    summary: str = Field(..., description="Operational summary of compiled warnings and queries")
    recommendation: str = Field(..., description="Final response action recommendation")
    priority: str = Field(..., description="Response severity priority (Low | Medium | High)")
    confidence: int = Field(..., description="Confidence percentage score (0-100)")

class OrchestratorResponse(BaseModel):
    intent: str = Field(..., description="Identified routing intent")
    selected_agents: List[str] = Field(..., description="List of targeted sub-agent identifiers")
    message: str = Field(..., description="Summary explanation status")
    sub_agent_responses: Optional[List[Dict[str, Any]]] = Field(default=[], description="JSON responses outputted by selected sub-agents")
    decision: Optional[DecisionResponse] = Field(default=None, description="Compiled multi-agent final decision")

class NavigationResponse(BaseModel):
    gate: str = Field(..., description="Target exit or entry gate")
    walking_time: str = Field(..., description="Estimated walking time description")
    crowd: str = Field(..., description="Current gate crowding status level")
    status: str = Field(..., description="Operation reference description")

class CrowdResponse(BaseModel):
    zone: str = Field(..., description="Monitored stadium seating zone or concourse")
    crowd_level: str = Field(..., description="Current occupancy level (e.g. High/Medium/Low)")
    prediction: str = Field(..., description="AI predictive crowd analysis for the immediate future")

class EmergencyResponse(BaseModel):
    priority: str = Field(..., description="Incident urgency priority score (Critical/Medium/Low)")
    recommended_action: str = Field(..., description="Security dispatch instruction")
    eta: str = Field(..., description="Expected arrival time of personnel")

class AccessibilityResponse(BaseModel):
    route: str = Field(..., description="Suggested wheelchair-friendly route name")
    warnings: List[str] = Field(..., description="Associated route accessibility hazards warning items")
