# StadiumBrain AI: Production Deployment

This guide outlines deployment steps for Next.js frontend on Vercel and FastAPI backend on Render.

## Frontend (Vercel)

The Next.js application compiles with ESLint and TypeScript rules.
1. Connect repository on Vercel dashboard.
2. Select Framework Preset: `Next.js`.
3. Set the Environment Variables:
   - `NEXT_PUBLIC_API_URL`: Points to backend FastAPI domain (e.g., `https://stadium-brain-api.onrender.com`).
4. Trigger deploy. Build runs custom `next build --turbopack` configurations.

## Backend (Render)

The python backend is a standard FastAPI server.
1. Create a `Web Service` on Render.
2. Build Command: `pip install -r backend/requirements.txt`
3. Start Command: `uvicorn app:app --host 0.0.0.0 --port $PORT`
4. Set Environment Variables:
   - `GEMINI_API_KEY`: Google Generative AI API Token.
   - `PORT`: Set dynamically by Render environment.
5. Trigger deploy.

## Healthchecks

- Backend Route: `GET /` or `GET /docs` (Auto-generated swagger docs).
