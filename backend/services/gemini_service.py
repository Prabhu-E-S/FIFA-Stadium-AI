import google.generativeai as genai
from backend.config import config
from backend.utils.logger import logger

class GeminiService:
    def __init__(self) -> None:
        """
        Initializes Google Generative AI client using loaded API key.
        Checks key existence to verify config integrity without making external requests.
        """
        self.api_key = config.GEMINI_API_KEY
        if not self.api_key:
            logger.warn("Gemini API key is not configured. Real AI features will be unavailable.")
            return

        try:
            logger.info("Initializing Google Generative AI SDK client...")
            genai.configure(api_key=self.api_key)
            logger.info("Google Generative AI SDK client successfully initialized.")
        except Exception as e:
            logger.error(f"Failed to configure Google Generative AI environment: {str(e)}")
            raise e

gemini_service = GeminiService()
