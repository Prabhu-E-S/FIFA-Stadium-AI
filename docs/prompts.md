# StadiumBrain AI: Prompt Engineering Strategy

This document details the prompt engineering framework, constraints, and structured output patterns used across our agent prompts.

## Prompt Architecture

Every prompt template in `backend/prompts/` is written in Markdown format and structured for maximum logical precision, satisfying eval bounds:
1. **Role**: Injects agent context and identities (e.g., "Stadium Accessibility & Mobility Agent").
2. **Goal**: Clarifies target deliverables (e.g., "Resolve wheelchair pathways and elevator routes").
3. **Context**: Context variables (`{{QUERY}}`, `{{CONTEXT}}`) representing real-time stadium metrics.
4. **Constraints**: Mandatory instructions (e.g., "Return ONLY valid JSON. No markdown backticks").
5. **JSON Schema**: Raw JSON block establishing schema definition to guide deterministic parser.
6. **Reasoning Rules**: Inferred reasoning triggers (e.g., "If fire collapse is detected, elevate overall priority to CRITICAL").
7. **Hallucination Prevention**: Explicit negative constraints (e.g., "Do not assume elevator active unless verified in context").
8. **Examples**: Demonstration matches to lock in output syntax.

## Schema Validation & Gemini Service Handling

The prompt parser leverages `backend/services/gemini_service.py` to strip markdown block fences (like ` ```json `) to guarantee raw JSON processing, resolving typical structural parse errors.
If Gemini outputs are missing fields or malformed, subagent handlers enforce fallback values matching the schema:
- **Heuristic Intent Fallbacks**: Standard routing maps.
- **Safe Empty Payload Handlers**: Decoupled default outputs.
