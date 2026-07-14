from google import genai
from fastapi import APIRouter, HTTPException
from dotenv import load_dotenv
import os, json
from agents.tools import fetch_papers_arxiv_tavily

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
suggestionRouter = APIRouter()

# Load corpus once only
with open("data/metal_remove_corpus.txt", "r", encoding="utf-8") as f:
    METAL_CORPUS = f.read()

@suggestionRouter.get("/user/analysis/suggestions")
def api_suggestions(
    contaminant: str,
    risk_level: str = None,
    pollution_status: str = None,
    formula_hmpi: float = None,
    dominant_metals: str = None
):
    contaminant_clean = contaminant.strip().lower()
    
    # Define query dynamically
    query = contaminant.strip()

    # Fetch papers from arXiv + Tavily
    papers = fetch_papers_arxiv_tavily(contaminant_clean)

    # Check if this contaminant is present in our local corpus
    corpus_present = contaminant_clean in METAL_CORPUS.lower()
    
    # Construct Risk Context if available from Agents 2, 3, or 4
    risk_context = ""
    if risk_level or pollution_status or formula_hmpi is not None or dominant_metals:
        risk_context = "\nCURRENT RISK PROFILE FROM ANALYZER AGENTS:"
        if risk_level:
            risk_context += f"\n- Risk Level: {risk_level}"
        if pollution_status:
            risk_context += f"\n- Pollution Status: {pollution_status}"
        if formula_hmpi is not None:
            risk_context += f"\n- Calculated HMPI Index: {formula_hmpi}"
        if dominant_metals:
            risk_context += f"\n- Dominant Metals in Area: {dominant_metals}"
        risk_context += "\nAdjust the urgency and focus of your recommendations based on this risk profile (e.g. prioritize immediate containment if Risk Level is high).\n"

    # Base prompt instructions
    base_instructions = """
  You are an Environmental Policy, RAG Recommendation, and Conversational Chatbot Agent.
  The user's query is provided in the QUESTION section below.
  Your task is to analyze the user's query and decide if they are asking for structured environmental mitigation suggestions/remediation actions for a water contaminant, OR if they are asking a general/conversational question, greeting, introduction, or generic query that doesn't fit a structured treatment recommendation template.

  If it is a structured contaminant mitigation/treatment suggestion request (or simply a contaminant name like "lead", "arsenic", "molybdenum", "chromium", etc.):
  - Set "response_type" to "suggestions"
  - Populate "immediate_actions", "long_term", and "positive_indicators" fields.
  - Every item in those lists must contain:
      - "text": the recommended method or indicator
      - "citations": list of papers matched from the context resources provided.
        Each citation object in the list must contain:
          - "title": exact title of the paper
          - "doi": DOI if present, or null
          - "url": URL of the paper
        If no verified citation exists, return an empty list [].

  If it is a general question, greeting, introduction, conversational message, or query that does not map directly to specific mitigation/remediation actions:
  - Set "response_type" to "text"
  - Populate the "text" field with a natural, helpful conversational response. (Keep "immediate_actions", "long_term", and "positive_indicators" as empty lists []).

  RETURN ONLY THIS EXACT JSON (NO MARKDOWN OR WRAPPING):

  {
    "response_type": "suggestions" or "text",
    "text": "Conversational reply text here, or empty string if response_type is suggestions",
    "immediate_actions": [
      {
        "text": "some method",
        "citations": [
          {
            "title": "paper title",
            "doi": "doi if present",
            "url": "url if present"
          }
        ]
      }
    ],
    "long_term": [
      {
        "text": "some long-term method",
        "citations": []
      }
    ],
    "positive_indicators": [
      {
        "text": "indicator text",
        "citations": []
      }
    ]
  }
  """

    # Build context sources dynamically
    context_sources = []
    
    if corpus_present:
        label = "CONTEXT SOURCE 1 (Local Corpus Guidelines)" if papers else "CONTEXT SOURCE (Local Corpus Guidelines)"
        context_sources.append(f"{label}:\n{METAL_CORPUS}")
    else:
        if not papers:
            context_sources.append(f"Note: Neither the local corpus nor web search engines returned documents. Please generate standard environmental mitigation recommendations for '{contaminant_clean}' based on international standards (WHO/EPA).")
        else:
            context_sources.append(f"Note: The contaminant '{contaminant_clean}' is not covered in detail in our local corpus. Extract your recommendations and support them ENTIRELY using the verified Scientific Web Resources and Preprints provided below.")

    if papers:
        papers_text = "\n\n".join([
            f"Paper Title: {p['title']}\nDOI: {p['doi']}\nURL: {p['url']}\nAbstract: {p['abstract']}"
            for p in papers
        ])
        label = "CONTEXT SOURCE 2 (Verified Scientific Web Resources and Preprints)" if corpus_present else "CONTEXT SOURCE (Verified Scientific Web Resources and Preprints)"
        context_sources.append(f"{label}:\n{papers_text}")

    context_str = "\n\n".join(context_sources)

    prompt = f"""
  {base_instructions}
  
  {context_str}
  
  {risk_context}

  QUESTION:
  {query}
  """

    # Using a valid Gemini model
    response = client.models.generate_content(
        model="gemini-3.1-flash-lite",
        contents=[{"text": prompt}]
    )

    raw = response.text.strip()
    raw = raw.replace("```json", "").replace("```", "").strip()

    try:
        parsed = json.loads(raw)
    except json.JSONDecodeError:
        raise HTTPException(
            status_code=500,
            detail="AI returned invalid JSON response. Please try again."
        )

    return parsed
