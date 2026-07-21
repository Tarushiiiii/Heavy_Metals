from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os
import sys
import importlib
from dotenv import load_dotenv

load_dotenv()

# Ensure sys.path includes backend directory and map 'backend' package in sys.modules
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

import types
if "backend" not in sys.modules:
    backend_pkg = types.ModuleType("backend")
    backend_pkg.__path__ = [current_dir]
    sys.modules["backend"] = backend_pkg


# Imports
from agents.hmpiCalc import predict_from_api_key as predict_api_hmpi_impl, APIKeyInput

suggestion_agent_module = importlib.import_module("agents.05_suggestionAgent")
suggestions_router = suggestion_agent_module.suggestionRouter

app = FastAPI(title="HMPI Backend")

FRONTEND_URL = os.getenv("CORS_ORIGIN")

# CORS Middleware
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://heavy-metals.vercel.app",
]
if FRONTEND_URL:
    clean_url = FRONTEND_URL.strip().strip('"\'').rstrip('/')
    if clean_url not in origins:
        origins.append(clean_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict_api_hmpi")
async def predict_api_hmpi(payload: dict):
    return predict_api_hmpi_impl(APIKeyInput(**payload))


# Pipeline Orchestration Routes
from orchestrator import run_pipeline
from fastapi import HTTPException
from typing import Union, Dict, Any

@app.post("/pipeline/run")
async def run_pipeline_file(file: UploadFile = File(...)):
    """Run full 5-agent pipeline on an uploaded CSV or Excel (.xlsx / .xls) file."""
    filename = (file.filename or "").lower()
    if not (filename.endswith(".csv") or filename.endswith(".xlsx") or filename.endswith(".xls")):
        raise HTTPException(
            status_code=400,
            detail="Unsupported file format. Please upload a CSV (.csv) or Excel (.xlsx, .xls) file."
        )

    content = await file.read()
    try:
        result = run_pipeline({"content": content, "filename": file.filename})
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Pipeline execution error: {str(e)}")



@app.post("/pipeline/run_raw")
async def run_pipeline_raw(payload: Union[Dict[str, Any], list]):
    """Run full 5-agent pipeline on raw JSON payload (dict or list of rows)."""
    try:
        result = run_pipeline(payload)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Pipeline execution error: {str(e)}")


# Suggestions Router
app.include_router(suggestions_router, tags=["suggestions"])

@app.get("/")
def home():
    return {"message": "HMPI Backend Running Successfully!"}
