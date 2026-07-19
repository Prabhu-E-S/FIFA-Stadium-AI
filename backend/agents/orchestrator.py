import json
from typing import Dict, Any
from utils.prompt_loader import load_prompt
from services.gemini_service import gemini_service
from utils.logger import logger

class OrchestratorAgent:
    def process(self, query: str) -> Dict[str, Any]:
        """
        Orchestration analysis using Gemini to select matching sub-agents.
        """
        logger.info(f"OrchestratorAgent processing query: {query}")
        
        # Load prompt markdown template
        try:
            formatted_prompt = load_prompt("orchestrator", {"QUERY": query})
        except Exception as e:
            logger.error(f"Failed to load orchestrator prompt: {str(e)}")
            return self._get_fallback(query)

        # Local fallback representation if Gemini call fails
        fallback_json = json.dumps(self._get_fallback(query))

        # Call Gemini model
        result = gemini_service.generate_json(formatted_prompt, fallback_json)
        logger.info(f"OrchestratorAgent query classification result: {result}")
        return result

    def _get_fallback(self, query: str) -> Dict[str, Any]:
        query_lower = query.lower()
        if "emergency" in query_lower or "help" in query_lower or "medical" in query_lower or "incident" in query_lower or "alert" in query_lower:
            intent = "emergency"
            selected_agents = ["emergency"]
            message = "Fallback: Incident notification matched with Emergency Agent."
        elif "accessible" in query_lower or "wheelchair" in query_lower or "elevator" in query_lower or "assistance" in query_lower:
            intent = "accessibility"
            selected_agents = ["accessibility"]
            message = "Fallback: Special mobility query matched with Accessibility Agent."
        elif "crowd" in query_lower or "capacity" in query_lower or "full" in query_lower or "attendance" in query_lower:
            intent = "crowd"
            selected_agents = ["crowd"]
            message = "Fallback: Crowd density query matched with Crowd Agent."
        elif "navigation" in query_lower or "route" in query_lower or "gate" in query_lower or "walk" in query_lower:
            intent = "navigation"
            selected_agents = ["navigation"]
            message = "Fallback: Routing query matched with Navigation Agent."
        else:
            intent = "navigation"
            selected_agents = ["navigation"]
            message = "Fallback: General query matching default navigation pathway."

        return {
            "intent": intent,
            "selected_agents": selected_agents,
            "message": message
        }
