import json
from typing import Dict, Any, Optional
from utils.prompt_loader import load_prompt
from services.gemini_service import gemini_service
from utils.logger import logger

class EmergencyAgent:
    def process(self, query: Optional[str] = None, context: Optional[str] = "") -> Dict[str, Any]:
        logger.info(f"EmergencyAgent processing query: {query}")
        
        try:
            formatted_prompt = load_prompt("emergency", {
                "QUERY": query or "Check safety",
                "CONTEXT": context or ""
            })
        except Exception as e:
            logger.error(f"Failed to load emergency prompt: {str(e)}")
            return self._get_fallback()

        fallback_json = json.dumps(self._get_fallback())
        result = gemini_service.generate_json(formatted_prompt, fallback_json)
        return result

    def _get_fallback(self) -> Dict[str, Any]:
        return {
            "agent": "Emergency",
            "status": "warning",
            "data": {
                "priority": "Medium",
                "recommended_action": "Fallback: Dispatch nearest safety officer.",
                "eta": "3 min"
            }
        }
