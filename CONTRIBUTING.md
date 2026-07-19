# Contributing to StadiumBrain AI

Thank you for your interest in contributing to the StadiumOperations Command Center! We welcome contributions related to AI safety, multi-agent frameworks, performance optimizations, and dashboard design.

## Development Workflow

### 1. Prerequisites
- **Node.js**: v18.x or later (v20+ recommended)
- **Python**: v3.10 or later
- **Gemini API Key**: Set your `GEMINI_API_KEY` environment variable.

### 2. Local Setup
1. Clone the repository and install dependencies:
   ```bash
   # Frontend
   npm install
   
   # Backend
   cd backend
   pip install -r requirements.txt
   pip install pytest httpx
   ```
2. Run the development environments:
   ```bash
   # Run FastAPI server
   python app.py
   
   # Run Next.js web application
   cd ..
   npm run dev
   ```

### 3. Running Tests
Verify your changes by running the test suite:
- **Backend Tests**:
  ```bash
  python -m pytest backend/tests/
  ```
- **Frontend Audits**:
  ```bash
  npm run build
  ```

## Issue and Pull Request Guidelines
- **Issues**: Use the bug report or feature request templates to detail the problem or suggestion.
- **Pull Requests**: Explain the problem solved, changes made, and include screenshot updates to verify styling consistency. Ensure all linter checks pass and `npm run build` completes with 0 errors.

## Code of Conduct
- Always follow professional, operator-grade design patterns.
- Ensure type safety by avoiding `any` types.
- Ensure AI safety via fallback error boundary rules.
