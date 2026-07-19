import json
import re
import google.generativeai as genai
from backend.config import config
from backend.utils.logger import logger

class GeminiService:
    def __init__(self) -> None:
        """
        Initializes Google Generative AI client using loaded API key.
        Checks key existence to verify config integrity.
        """
        self.api_key = config.GEMINI_API_KEY
        self.has_key = bool(self.api_key)
        if not self.has_key:
            logger.warning("Gemini API key is not configured. Real AI features will be unavailable.")
            return

        try:
            logger.info("Initializing Google Generative AI SDK client...")
            genai.configure(api_key=self.api_key)
            logger.info("Google Generative AI SDK client successfully initialized.")
        except Exception as e:
            logger.error(f"Failed to configure Google Generative AI environment: {str(e)}")
            self.has_key = False

    def generate_json(self, prompt: str, fallback_str: str) -> dict:
        """
        Executes a prompt against Gemini model and returns a parsed dictionary.
        Falls back to parsing the provided default JSON string on failure or in absence of API key.
        """
        if not self.has_key:
            logger.debug("Gemini API key is missing or configuration failed. Using local fallback.")
            return json.loads(fallback_str)

        try:
            # Using gemini-1.5-flash for swift real-time operations dashboard
            model = genai.GenerativeModel("gemini-1.5-flash")
            response = model.generate_content(prompt)
            text = response.text.strip()
            
            # Clean possible markdown block envelopes: ```json ... ``` or ``` ... ```
            text_cleaned = re.sub(r"^```(?:json)?\s*", "", text)
            text_cleaned = re.sub(r"\s*```$", "", text_cleaned).strip()
            
            return json.loads(text_cleaned)
        except Exception as e:
            logger.error(f"Gemini API invocation or JSON parsing failed: {str(e)}. Using fallback.")
            try:
                return json.loads(fallback_str)
            except Exception:
                return {}

gemini_service = GeminiService()
