# Heavy Metals — Groundwater Water Quality & Pollution Analysis Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/Frontend-React%20%7C%20Vite-blue)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688)](https://fastapi.tiangolo.com/)
[![PyTorch](https://img.shields.io/badge/ML-PyTorch%20%7C%20Scikit--Learn-ee4c2c)](https://pytorch.org/)

**Heavy Metals** is a comprehensive, multi-agent AI and Machine Learning platform designed to analyze groundwater contamination, compute Heavy Metal Pollution Indices (HMPI, HPI, HEI, Cd, MI, CI), perform spatial geospatial mapping with reverse geocoding, predict pollution sources (Anthropogenic vs. Geogenic), and generate automated environmental assessment reports.

---

## Key Features

- **Multi-Index Pollution Computation**: Calculates HPI, HEI (Heavy Metal Evaluation Index), $C_d$ (Degree of Contamination), MI (Metal Index), and Unified Composite Index (CI).
- **Interactive Geospatial Mapping**: Powered by Google Maps JavaScript API centered on high-risk zones (Delhi NCR) with custom radius risk indicators and **OpenStreetMap Nominatim** reverse geocoding.
- **5-Agent Autonomous Architecture**: End-to-end pipeline covering preprocessing, calculation, BiLSTM forecasting, risk assessment, RAG-assisted scientific suggestions, and export rendering.
- **EcoMitigate AI Chatbot**: Interactive conversational assistant powered by RAG and Gemini AI for retrieving immediate remediation steps and scientific research citations (arXiv/Tavily/DOIs).
- **Structured PDF Report Export**: Instant, single-page formatted PDF report generation featuring location details, HMPI scores, side-by-side Composite Index / Status Legend, and source attribution.
- **Advanced Analytics Dashboard**: Interactive pie charts, state cumulative charts, metal concentration breakdowns, and bulk dataset processing.

---

## Multi-Agent Architecture

```
                    User Uploads Dataset / Input
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│ Agent 1 : Data Preprocessing Agent                          │
├─────────────────────────────────────────────────────────────┤
│ • Validates schema & units (mg/L, ug/L, PPB)                │
│ • Handles missing values via KNN Imputation                 │
│ • Removes duplicates & detects statistical outliers         │
│                                                             │
│ Output ➔ Clean Standardized Dataset                         │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│ Agent 2 : Pollution Index Computation Agent                 │
├─────────────────────────────────────────────────────────────┤
│ • Evaluates WHO / BIS permissible limits                    │
│ • Computes HMPI, HPI, HEI, Cd, MI, & Composite Index (CI)   │
│ • Determines severity (Safe, Alert, Critical)               │
│                                                             │
│ Output ➔ Multi-Index Scores & Dominant Metals               │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│ Agent 3 : Forecast & Source Attribution Agent               │
├─────────────────────────────────────────────────────────────┤
│ • Dual-Head BiLSTM + Multi-Head Temporal Attention Model    │
│ • Feature Engineering: Contamination Factor (CF), PLI      │
│ • PCA Dimensionality Reduction + K-Means Clustering        │
│ • Random Forest Classifier: Anthropogenic vs. Geogenic      │
│                                                             │
│ Output ➔ Forecast Trends, Source Type & Confidence Score    │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│ Agent 4 : Risk Assessment & Explainability Agent            │
├─────────────────────────────────────────────────────────────┤
│ • Evaluates risk severity thresholds                        │
│ • Computes key contributing pollutants & root causes        │
│ • Generates human-readable environmental explanations       │
│                                                             │
│ Output ➔ Risk Explanation & Severity Metrics                │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│ Agent 5 : RAG Suggestions & Recommendations Agent           │
├─────────────────────────────────────────────────────────────┤
│ • Queries local remediation vector corpus & arXiv API       │
│ • Synthesizes immediate actions & long-term monitoring      │
│ • Provides verified scientific literature citations (DOIs)  │
│                                                             │
│ Output ➔ Expert Remediation Plan & Research Sources         │
└─────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│ Output ➔ Interactive Web App & PDF Export                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

- **Frontend**: React 18, Vite, Zustand, TailwindCSS, Lucide React, jsPDF
- **Maps**: Google Maps JavaScript API (`@react-google-maps/api`), Leaflet, OpenStreetMap Nominatim
- **Backend**: FastAPI, Uvicorn, Python 3.10+
- **Machine Learning & Data Science**: PyTorch, Scikit-Learn, Pandas, NumPy, Joblib
- **AI & RAG**: Google Gemini API, arXiv API, Custom Knowledge Corpus

### 4.2 Key Technologies & Concepts

- **Multi-Agent AI Architecture & RAG**: The platform utilizes a 5-agent autonomous pipeline to orchestrate end-to-end data validation, multi-index calculation (HMPI, HPI, HEI, $C_d$, MI, CI), predictive modeling, and scientific remediation synthesis. Integrated Retrieval-Augmented Generation (RAG) backed by Google Gemini API and arXiv literature retrieval enables real-time context-aware answers and verified DOI research citations.
- **Dual-Head BiLSTM with Multi-Head Temporal Attention**: For time-series trend forecasting and pollution source attribution (Anthropogenic vs. Geogenic), the machine learning engine employs a PyTorch Dual-Head BiLSTM model augmented with temporal attention. Coupled with PCA dimensionality reduction and Random Forest classification, it accurately models complex non-linear contaminant trajectories.
- **Geospatial Mapping & Reverse Geocoding**: The visualization engine combines Google Maps JavaScript API with OpenStreetMap Nominatim reverse geocoding to pinpoint high-risk groundwater contamination zones with dynamic risk indicators. This provides localized address resolution and powers automated single-page PDF environmental report generation.

---

## 11. Deployment & Usage Guide

### 11.1 System Requirements

| Parameter | Specification |
|---|---|
| **Python Version** | Python 3.10+ |
| **Node.js Version** | Node.js v18+ |
| **OS / Platform** | Windows 10/11 / macOS 14 / Ubuntu 22.04 / Google Colab |
| **GPU Requirement** | Optional (NVIDIA T4 16GB / Google Colab T4 supported for PyTorch training; CPU supported) |
| **API Keys Required** | `GEMINI_API_KEY`, `TAVILY_API_KEY` (optional), `VITE_REACT_APP_GOOGLE_MAPS_API_KEY` |
| **Disk Space** | ~500 MB for PyTorch model weights + ~200 MB for vector store & dependencies |

---

### 11.2 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Tarushiiiii/Heavy_Metals.git
   cd Heavy_Metals
   ```

2. **Create and activate a virtual environment (Backend)**:
   ```bash
   cd backend
   python -m venv venv

   # Windows (PowerShell):
   .\venv\Scripts\activate
   # Linux / macOS:
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set environment variables**:
   Create a `.env` file in `backend/`:
   ```env
   GEMINI_API_KEY="your_gemini_api_key"
   TAVILY_API_KEY="your_tavily_api_key"
   CORS_ORIGIN="http://localhost:5173"
   ```
   Create a `.env` file in `frontend/`:
   ```env
   VITE_REACT_APP_GOOGLE_MAPS_API_KEY="your_google_maps_api_key"
   VITE_BACKEND_URL="http://127.0.0.1:8000"
   ```

5. **Launch the backend server**:
   ```bash
   uvicorn main:app --reload
   ```
   > Backend running at: `http://127.0.0.1:8000` (Swagger docs: `http://127.0.0.1:8000/docs`)

6. **Install and launch the frontend application**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   > Web app running at: `http://localhost:5173`

---

## How to Use

1. **Calculate HMPI**: Navigate to **Calculate HMPI** to input sample data manually, submit an API key, or upload a bulk CSV/Excel dataset.
2. **View Analysis**: Explore interactive charts, including individual metal concentration breakdowns, Composite Index radar charts, and risk severity metrics.
3. **Geospatial Map**: View high-risk zones in Delhi NCR with custom radius risk indicators. Hover over points to view Nominatim reverse-geocoded addresses and click to download individual location PDF reports.
4. **Browse Suggestions**: Filter by contaminant (e.g. Lead, Arsenic) to view immediate response actions, long-term monitoring strategies, and scientific paper references.
5. **Chatbot (EcoMitigate AI)**: Use the floating bottom-right chatbot to query remediation methods or get scientific references for any heavy metal contaminant.

---

## File Structure

```
Heavy_Metals/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── analysis/       # Suggestions & Methodology components
│   │   │   ├── calculate/      # Bulk report & input components
│   │   │   ├── chatbot/        # EcoMitigate AI Chatbot
│   │   │   ├── graphs/         # Google Maps (EnhancedGeoTag), Pie, & Composite Charts
│   │   │   ├── layout/         # Header, Layout, Sidebar, & Error Boundaries
│   │   │   └── ui/             # Buttons, Cards, & Navbar
│   │   ├── pages/
│   │   │   ├── about_us.jsx
│   │   │   ├── analysis.jsx
│   │   │   ├── calculate.jsx
│   │   │   ├── map.jsx
│   │   │   ├── reports.jsx
│   │   │   └── landing_page.jsx
│   │   ├── store/              # Zustand state management
│   │   ├── utils/
│   │   │   └── functions/      # Utility helpers, PDF exporter (userNavs.js), getReport.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── agents/
│   │   ├── 01_preprocessingAgent.py   # Agent 1: Data Preprocessing & Cleaning
│   │   ├── 02_computeAgent.py         # Agent 2: HMPI, HEI, Cd, MI, CI Computation
│   │   ├── 03_forcastAgent.py         # Agent 3: BiLSTM & Source Attribution Training
│   │   ├── 04_riskassessmentAgent.py # Agent 4: Risk Explanation & Severity
│   │   ├── 05_recommendationAgent.py # Agent 5a: Transformer ML Model Recommendations
│   │   ├── 05_suggestionAgent.py     # Agent 5b: RAG & Gemini Remediation Suggestions
│   │   └── hmpiCalc.py               # Calculation tools
│   ├── main.py                        # FastAPI endpoints
│   ├── orchestrator.py                # Multi-Agent Pipeline Execution Engine
│   └── requirements.txt
│
└── README.md
```

---

### Developed by Team CodeBlooded
*Building intelligent environmental software for cleaner water resources.*
