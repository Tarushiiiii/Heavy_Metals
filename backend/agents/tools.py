from langchain_community.tools import ArxivQueryRun
from langchain_community.utilities import ArxivAPIWrapper
from langchain_tavily import TavilySearch

from dotenv import load_dotenv
load_dotenv()

import os, requests
import xml.etree.ElementTree as ET

arxiv_api = ArxivAPIWrapper(top_k_results=2, doc_content_chars_max=500)
arxiv = ArxivQueryRun(api_wrapper=arxiv_api, description="Query arxiv papers")

tavily = TavilySearch()

tools = [arxiv, tavily]

def fetch_papers_arxiv_tavily(contaminant: str) -> list:
    papers = []
    
    # 1. Fetch from Tavily (web search, PMC, ScienceDirect)
    try:
        tavily_res = tavily.invoke(f"{contaminant} removal from water")
        results = tavily_res.get("results", [])[:3]
        for r in results:
            papers.append({
                "title": r.get("title"),
                "url": r.get("url"),
                "doi": None,
                "abstract": r.get("content")
            })
    except Exception as e:
        print(f"Error fetching from Tavily: {e}")
            
    # 2. Fetch from arXiv (academic preprints)
    try:
        url = "http://export.arxiv.org/api/query"
        params = {
            "search_query": f"all:{contaminant} removal water",
            "max_results": 2
        }
        res = requests.get(url, params=params, timeout=4)
        if res.status_code == 200:
            root = ET.fromstring(res.content)
            ns = {'atom': 'http://www.w3.org/2005/Atom'}
            entries = root.findall('atom:entry', ns)
            for entry in entries:
                title_elem = entry.find('atom:title', ns)
                title = title_elem.text.strip().replace('\n', ' ') if title_elem is not None else "Unknown preprint"
                
                id_elem = entry.find('atom:id', ns)
                id_url = id_elem.text.strip() if id_elem is not None else None
                
                summary_elem = entry.find('atom:summary', ns)
                summary = summary_elem.text.strip().replace('\n', ' ') if summary_elem is not None else ""
                
                # DOI if present in arXiv metadata
                doi = None
                doi_elem = entry.find('{http://arxiv.org/schemas/atom}doi')
                if doi_elem is not None:
                    doi = doi_elem.text.strip()
                    
                papers.append({
                    "title": title,
                    "url": id_url,
                    "doi": doi,
                    "abstract": summary
                })
    except Exception as e:
        print(f"Error fetching from arXiv: {e}")
        
    return papers

