# Heavy Metals Backend Service

FastAPI-powered machine learning and artificial intelligence backend service for **Heavy Metals Pollution Index (HMPI)** calculation, time-series forecasting, pollution source attribution, risk assessment, and RAG-based remediation recommendations.

---

## FastAPI Endpoints Summary

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Health check endpoint returning backend status. |
| `POST` | `/predict_api_hmpi` | Calculates HMPI for a single sample payload via API key input. |
| `POST` | `/pipeline/run` | **Full Multi-Agent Pipeline**: Uploads CSV/Excel dataset and runs Agents 1 through 5 sequentially. |
| `POST` | `/pipeline/run_raw` | Executes full pipeline on raw JSON array/dict payload. |
| `GET` | `/user/analysis/suggestions` | **Agent 5 RAG Suggestions**: Returns immediate actions, long-term monitoring, positive indicators, and arXiv citations for a specific contaminant. |

---

## Agents Breakdown

```
                User Uploads Dataset / Input
                              │
                              ▼
                    POST /pipeline/run
                              │
                              ▼
┌───────────────────────────────────────────────────────────┐
│ Agent 1 : Data Preprocessing Agent (01_preprocessing.py)  │
├───────────────────────────────────────────────────────────┤
│ • Validates input headers & units (mg/L, ug/L, PPB)       │
│ • Imputes missing values via KNN Imputer                  │
│ • Removes duplicates & detects statistical outliers       │
└───────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────┐
│ Agent 2 : Computation Agent (02_computeAgent.py)          │
├───────────────────────────────────────────────────────────┤
│ • Evaluates WHO / BIS permissible limits                  │
│ • Computes HMPI, HPI, HEI, Cd, MI, & Composite Index (CI) │
│ • Rates severity (Safe, Alert, Critical)                  │
└───────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────┐
│ Agent 3 : Forecast & Source Agent (03_forcastAgent.py)    │
├───────────────────────────────────────────────────────────┤
│ • Dual-Head BiLSTM + Multi-Head Temporal Attention Model  │
│ • Computes Contamination Factors (CF) & PLI               │
│ • PCA Dimensionality Reduction + K-Means Clustering (K=7) │
│ • Random Forest Classifier for Anthropogenic vs Geogenic  │
└───────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────┐
│ Agent 4 : Risk Assessment Agent (04_riskassessment.py)    │
├───────────────────────────────────────────────────────────┤
│ • Evaluates risk severity thresholds                      │
│ • Identifies major contributing pollutants                │
│ • Generates explainable environmental descriptions        │
└───────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────┐
│ Agent 5 : RAG Suggestion Agent (05_suggestionAgent.py)    │
├───────────────────────────────────────────────────────────┤
│ • Queries local remediation corpus & arXiv paper API      │
│ • Synthesizes prompt with Gemini LLM                     │
│ • Returns structured actions & verified DOIs/citations    │
└───────────────────────────────────────────────────────────┘
```

---

## Requirements & Environment Configuration

Create a `.env` file inside the `backend/` directory:

```env
GEMINI_API_KEY="your_google_gemini_api_key"
TAVILY_API_KEY="your_tavily_api_key_optional"
CORS_ORIGIN="http://localhost:5173"
```

---

## Local Backend Setup

```bash
# 1. Navigate to backend directory
cd backend

# 2. Create Python virtual environment
python -m venv venv

# 3. Activate virtual environment
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Start backend server
uvicorn main:app --reload
```

Interactive API documentation available at: **`http://127.0.0.1:8000/docs`**

---

## Directory Structure

```
backend/
├── agents/
│   ├── 01_preprocessingAgent.py   # Agent 1: Preprocessing & KNN Imputation
│   ├── 02_computeAgent.py         # Agent 2: HMPI & Multi-Index Computation
│   ├── 03_forcastAgent.py         # Agent 3: BiLSTM & Source Pipeline Training
│   ├── 04_riskassessmentAgent.py # Agent 4: Risk Explanation & Severity
│   ├── 05_recommendationAgent.py # Agent 5a: Machine Learning Recommendations
│   ├── 05_suggestionAgent.py     # Agent 5b: RAG & Gemini AI Suggestions Router
│   ├── predictSource.py          # Agent 3 Random Forest Inference Endpoint
│   ├── hmpiCalc.py               # Fast API Key Calculator
│   └── tools.py                  # arXiv & Vector search tools
├── dataset/
│   └── metal_remove_corpus.txt   # Remediation text corpus for Agent 5
├── models/                       # Pre-trained pipeline weights & scalers
├── utils/
│   └── constants.py              # WHO permissible metal limits
├── main.py                       # FastAPI Application entry point & router
├── orchestrator.py               # Multi-Agent Sequential Execution Engine
└── requirements.txt
```

---

### Developed by Team CodeBlooded
*Building intelligent environmental software for cleaner water resources.*