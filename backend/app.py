from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import time

from backend.config import config
from backend.utils.logger import log_request, log_error, logger
from backend.routes import orchestrator, navigation, crowd, emergency, accessibility
from backend.services.gemini_service import gemini_service # Trigger initialization

app = FastAPI(
    title="StadiumBrain AI Backend",
    description="Operations intelligence backend for the FIFA World Cup 2026",
    version="1.0.0"
)

# CORS middleware config
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging middleware for incoming requests
@app.middleware("http")
async def log_incoming_requests(request: Request, call_next):
    method = request.method
    path = request.url.path
    ip = request.client.host if request.client else "unknown"
    log_request(method, path, ip)
    
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    
    logger.info(f"Processed: {method} {path} | Status: {response.status_code} | Duration: {duration:.4f}s")
    return response

# Custom HTTP exception handler
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    log_error(f"HTTP {exc.status_code} at {request.url.path}", exc)
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )

# Generic exception handler
@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    log_error(f"Unhandled Exception at {request.url.path}", exc)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error occurred."}
    )

# Root status route
@app.get("/")
async def root_status():
    return {
        "status": "running",
        "project": "StadiumBrain AI"
    }

# Include routing packages
app.include_router(orchestrator.router, prefix="/api")
app.include_router(navigation.router, prefix="/api")
app.include_router(crowd.router, prefix="/api")
app.include_router(emergency.router, prefix="/api")
app.include_router(accessibility.router, prefix="/api")
