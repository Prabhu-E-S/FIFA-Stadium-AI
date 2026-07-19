# StadiumBrain AI: API Reference

This document maps out the FastAPI REST endpoint details for the StadiumBrain AI platform.

## Orchestration Endpoint

Runs the query command through the intent detection, sub-agent parallel invocation, and final decision-maker pipelines.

- **URL**: `/api/orchestrator`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
- **Request Body (JSON Schema)**:
  ```json
  {
    "type": "object",
    "properties": {
      "query": { "type": "string", "example": "Crowd congestion reported near East Stand. Advise bypass routing." }
    },
    "required": ["query"]
  }
  ```

- **Response Body (JSON Schema)**:
  ```json
  {
    "type": "object",
    "properties": {
      "intent": { "type": "string", "enum": ["navigation", "crowd", "emergency", "accessibility", "multiple", "unknown"] },
      "selected_agents": {
        "type": "array",
        "items": { "type": "string" }
      },
      "message": { "type": "string" },
      "sub_agent_responses": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "agent": { "type": "string" },
            "status": { "type": "string" },
            "data": { "type": "object" }
          },
          "required": ["agent", "status", "data"]
        }
      },
      "decision": {
        "type": "object",
        "properties": {
          "summary": { "type": "string" },
          "recommendation": { "type": "string" },
          "priority": { "type": "string" },
          "confidence": { "type": "integer" }
        },
        "required": ["summary", "recommendation", "priority", "confidence"]
      }
    },
    "required": ["intent", "selected_agents", "message", "sub_agent_responses", "decision"]
  }
  ```

- **Sample Response**:
  ```json
  {
    "intent": "navigation",
    "selected_agents": ["navigation"],
    "message": "Selecting navigation for query",
    "sub_agent_responses": [
      {
        "agent": "Navigation",
        "status": "success",
        "data": {
          "gate": "Gate A",
          "walking_time": "4 min",
          "crowd": "Medium",
          "status": "Accessible pathways clear."
        }
      }
    ],
    "decision": {
      "summary": "Requesting entry gate suggestions.",
      "recommendation": "Go towards Gate A, estimated walking time is 4 min.",
      "priority": "Low",
      "confidence": 98
    }
  }
  ```
