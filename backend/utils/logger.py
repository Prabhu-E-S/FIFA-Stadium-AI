import logging
import sys
import time
from typing import Dict, Any

# Configure standard logger
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)

logger = logging.getLogger("StadiumBrainAPI")

def log_request(method: str, path: str, ip: str) -> None:
    logger.info(f"Incoming Request: {method} {path} from {ip}")

def log_agent_execution(agent_name: str, duration: float, metadata: Dict[str, Any] = None) -> None:
    meta_str = f" | Metadata: {metadata}" if metadata else ""
    logger.info(f"Agent '{agent_name}' completed execution in {duration:.4f}s{meta_str}")

def log_error(context: str, error: Exception) -> None:
    logger.error(f"Error in {context}: {str(error)}", exc_info=True)
