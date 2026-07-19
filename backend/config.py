import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
    PORT = int(os.getenv("PORT", "8000"))
    HOST = os.getenv("HOST", "127.0.0.1")
    CORS_ORIGINS = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

config = Config()
