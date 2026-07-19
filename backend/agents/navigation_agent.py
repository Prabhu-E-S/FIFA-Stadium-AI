import json
from typing import Dict, Any, Optional
from backend.utils.prompt_loader import load_prompt
from backend.services.gemini_service import gemini_service
from backend.utils.logger import logger

class NavigationAgent:
    def process(self, query: Optional[str] = None, context: Optional[str] = "") -> Dict[str, Any]:
        logger.info(f"NavigationAgent processing query: {query}")
        
        try:
            formatted_prompt = load_prompt("navigation", {
                "QUERY": query or "Find routes",
                "CONTEXT": context or ""
            })
        except Exception as e:
            logger.error(f"Failed to load navigation prompt: {str(e)}")
            return self._get_fallback()

        fallback_json = json.dumps(self._get_fallback())
        result = gemini_service.generate_json(formatted_prompt, fallback_json)
        return result

    def _get_fallback(self) -> Dict[str, Any]:
        return {
            "agent": "Navigation",
            "status": "success",
            "data": {
                "gate": "Gate A",
                "walking_time": "8 min",
                "crowd": "Medium",
                "status": "Fallback: Route remains clear."
            }
        }
