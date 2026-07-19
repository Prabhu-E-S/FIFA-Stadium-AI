import json
from typing import Dict, Any, List

from backend.utils.prompt_loader import load_prompt
from backend.services.gemini_service import gemini_service
from backend.utils.logger import logger

class DecisionAgent:
    def process(self, query: str, sub_agent_responses: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Takes the query and all activated sub-agent responses, analyzes them,
        and generates the final operational decision.
        """
        logger.info(f"DecisionAgent processing query: '{query}' with {len(sub_agent_responses)} agent outputs.")
        
        try:
            formatted_prompt = load_prompt("decision", {
                "QUERY": query,
                "SUB_AGENT_RESPONSES": json.dumps(sub_agent_responses, indent=2)
            })
        except Exception as e:
            logger.error(f"Failed to load decision prompt: {str(e)}")
            return self._get_fallback(query, sub_agent_responses)

        fallback_json = json.dumps(self._get_fallback(query, sub_agent_responses))
        result = gemini_service.generate_json(formatted_prompt, fallback_json)
        return result

    def _get_fallback(self, query: str, sub_agent_responses: List[Dict[str, Any]]) -> Dict[str, Any]:
        has_critical = False
        if sub_agent_responses:
            has_critical = any(x.get("status") in ["danger", "error", "critical"] for x in sub_agent_responses)
        priority = "High" if has_critical else "Medium"
        return {
            "summary": f"Fallback: Query '{query}' processed by safety decision loops.",
            "recommendation": "Maintain standard operational stadium protocol. Dispatch team as required.",
            "priority": priority,
            "confidence": 90
        }
