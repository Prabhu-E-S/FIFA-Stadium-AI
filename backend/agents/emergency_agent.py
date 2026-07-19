from typing import Dict, Any, Optional

class EmergencyAgent:
    def process(self, query: Optional[str] = None) -> Dict[str, Any]:
        """
        Processes safety alerts and generates response instructions.
        """
        return {
            "priority": "Medium",
            "recommended_action": "Dispatch nearest volunteer",
            "eta": "3 min"
        }
