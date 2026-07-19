import json
from typing import Dict, Any, Optional
from backend.utils.prompt_loader import load_prompt
from backend.services.gemini_service import gemini_service
from backend.utils.logger import logger

class CrowdAgent:
    def process(self, query: Optional[str] = None, context: Optional[str] = "") -> Dict[str, Any]:
        logger.info(f"CrowdAgent processing query: {query}")
        
        try:
            formatted_prompt = load_prompt("crowd", {
                "QUERY": query or "Analyze crowd",
                "CONTEXT": context or ""
            })
        except Exception as e:
            logger.error(f"Failed to load crowd prompt: {str(e)}")
            return self._get_fallback()

        fallback_json = json.dumps(self._get_fallback())
        result = gemini_service.generate_json(formatted_prompt, fallback_json)
        return result

    def _get_fallback(self) -> Dict[str, Any]:
        return {
            "agent": "Crowd",
            "status": "success",
            "data": {
                "zone": "East Stand",
                "crowd_level": "High",
                "prediction": "Fallback: Forecast expect density peak at Matchday close."
            }
        }
