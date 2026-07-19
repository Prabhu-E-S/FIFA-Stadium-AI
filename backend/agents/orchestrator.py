from typing import Dict, Any, List

class OrchestratorAgent:
    def process(self, query: str) -> Dict[str, Any]:
        """
        Orchestration analysis to select matching sub-agents.
        """
        query_lower = query.lower()
        if "navigation" in query_lower or "route" in query_lower or "gate" in query_lower or "walk" in query_lower:
            intent = "navigation"
            selected_agents = ["navigation"]
            message = "Routing query successfully matched with Navigation Agent."
        elif "crowd" in query_lower or "capacity" in query_lower or "full" in query_lower or "attendance" in query_lower:
            intent = "crowd"
            selected_agents = ["crowd"]
            message = "Crowd density query successfully matched with Crowd Agent."
        elif "emergency" in query_lower or "help" in query_lower or "medical" in query_lower or "incident" in query_lower or "alert" in query_lower:
            intent = "emergency"
            selected_agents = ["emergency"]
            message = "Incident notification successfully matched with Emergency Agent."
        elif "accessible" in query_lower or "wheelchair" in query_lower or "elevator" in query_lower or "assistance" in query_lower:
            intent = "accessibility"
            selected_agents = ["accessibility"]
            message = "Special mobility query successfully matched with Accessibility Agent."
        else:
            intent = "general"
            selected_agents = ["navigation", "crowd", "emergency", "accessibility"]
            message = "General enquiry: dispatching query parameters to all analytics agents."

        return {
            "intent": intent,
            "selected_agents": selected_agents,
            "message": message
        }
