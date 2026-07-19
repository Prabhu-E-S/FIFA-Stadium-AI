# StadiumBrain AI: Operations Command Center 🏟️🧠

StadiumBrain AI is a production-ready, professional-grade multi-agent operations command center built to manage real-time transit routing, crowd density analytics, emergency operations, and barrier-free mobility coordination.

Designed for MetLife Stadium, it integrates a client-side operator console with a backend multi-agent pipeline powered by Google Generative AI (Gemini).

---

## 📖 Complete Documentation Index

For exhaustive technical guidelines, developer checklists, and system designs, refer to our central documentation suite:

- 📊 **[System Architecture](file:///d:/Projects/FIFA%20Stadium%20AI/docs/architecture.md)**: Frontend/Backend layouts, decoupled metrics systems, and technology stack.
- 🤖 **[Multi-Agent Core Architecture](file:///d:/Projects/FIFA%20Stadium%20AI/docs/agents.md)**: Sub-agent execution rules, division of responsibilities, and decision handlers.
- ⚡ **[Prompt Engineering Strategy](file:///d:/Projects/FIFA%20Stadium%20AI/docs/prompts.md)**: JSON schema enforcement, reasoning constraints, and hallucination protection.
- 🔌 **[API Reference docs](file:///d:/Projects/FIFA%20Stadium%20AI/docs/api.md)**: Request payloads, Pydantic schemas, and sample JSON responses.
- 🚀 **[Production Deployment manual](file:///d:/Projects/FIFA%20Stadium%20AI/docs/deployment.md)**: Deploying to Vercel (Next.js) & Render (FastAPI).
- 🔄 **[Agent Workflow diagrams](file:///d:/Projects/FIFA%20Stadium%20AI/docs/workflow.md)**: Sequence diagrams demonstrating raw query routing.

---

## 🌟 Key Features

### 🕹️ Unified Command Center & Interactive Stadium Map
- **SVG Hotspot Telemetry**: Real-time hover updates for all 4 quadrants (North, East, South, Weststands). Shows seat location sectors, active gates, and congestion levels.
- **Fail-Safe Containment**: Reusable React `ErrorBoundary` wrappers ensure that a mapping or charting library crash will never cause dashboard outages.
- **Simulated Metrics Engine**: Emits mock crowd load densities and alert categories if backend gateways are offline.

### 🤖 Hierarchical Multi-Agent Pipeline
- **Parallel Dispatching**: The **Central Orchestrator** parses commands and dispatches the relevant sub-agents (**Navigation**, **Crowd**, **Emergency**, **Accessibility**) in parallel.
- **Intelligent Consolidation**: The **Decision Agent** aggregates sub-agent telemetry structures, reconciles discrepancies (e.g., bypassing gates with high crowd loads), and yields a definitive priority and recommendation.
- **Robustness**: Inputs are sanitized against empty/whitespace injections. Exceptions caught in sub-agent executors are trapped locally, returning safe fallback warnings without causing pipeline failures.
- **API Cache & Connection Resilience**: Local keyword-matching heuristics activate if credentials are missing or connection timeouts are reached.

---

## 🛠️ Tech Stack & Directory Structure

### Stack
- **Frontend**: Next.js 15 (App Router, Turbopack), Framer Motion, Recharts, Lucide React icons, Tailwind/CSS Variables styling.
- **Backend**: FastAPI, Pydantic validation, pytest, Python 3.10+, Google Generative AI Python Client SDK.

### Directory Structure
```
├── app/                  # Next.js page routers (Operations Dashboard, Analytics, Workflow, navigation)
├── components/           # Reusable components (operations/ common/ layout/)
├── lib/                  # Layout context systems & API fetching wrappers
├── types/                # Unified TypeScript type declarations
├── backend/
│   ├── agents/           # Orchestrator, Sub-agents, and Decision agent logic
│   ├── prompts/          # Optimized markdown prompts for prompt engineering (.md)
│   ├── routes/           # FastAPI controller endpoints
│   ├── services/         # Gemini generative model service interface
│   ├── utils/            # Logging trackers and template loaders
│   ├── tests/            # Python pytest integration tests suite
│   ├── app.py            # FastAPI main application entrypoint
│   └── requirements.txt  # Python requirements
├── docs/                 # Architecture, Agent workflows, API, and Deployment documentation (.md)
├── CONTRIBUTING.md       # Open source contribution instructions
└── LICENSE               # MIT project license
```

---

## 🚀 Quick Start & Development

### 1. Set Up Environment Variables
Create a `.env` variables configurations (or export to your environment shell):
```env
GEMINI_API_KEY="your-google-gemini-sdk-api-key"
```

### 2. Run Python FastAPI Server
```bash
# Navigate to backend and install requirements
cd backend
pip install -r requirements.txt
pip install pytest httpx

# Start local server debug mode
python app.py
```
FastAPI runs on `http://127.0.0.1:8000`. Swagger API docs can be viewed on `http://127.0.0.1:8000/docs`.

### 3. Run Next.js Dashboard App
```bash
# In the project root directory
npm install
npm run dev
```
Open `http://localhost:3000` to view the user interface.

### 4. Running Backend Tests
Execute Python backend module test suites:
```bash
python -m pytest backend/tests/
```

---

## ⚖️ License
Licensed under the [MIT License](file:///d:/Projects/FIFA%20Stadium%20AI/LICENSE).
