import os
from typing import Dict

def load_prompt(prompt_name: str, variables: Dict[str, str]) -> str:
    """
    Loads a markdown prompt template from the backend/prompts/ directory
    and replaces template placeholders (e.g. {{QUERY}}) with formatting variables.
    """
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    prompt_path = os.path.join(base_dir, "prompts", f"{prompt_name}.md")
    
    if not os.path.exists(prompt_path):
        raise FileNotFoundError(f"Prompt file not found at: {prompt_path}")
        
    with open(prompt_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    for key, val in variables.items():
        placeholder = f"{{{{{key}}}}}"
        content = content.replace(placeholder, str(val) if val is not None else "")
        
    return content
