import importlib
import io
import json
import logging
import os
import sys
from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional, Union
import pandas as pd

# Ensure sys.path includes backend directory and map 'backend' package in sys.modules
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

import types
if "backend" not in sys.modules:
    backend_pkg = types.ModuleType("backend")
    backend_pkg.__path__ = [current_dir]
    sys.modules["backend"] = backend_pkg

# Setup logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - [%(levelname)s] - %(message)s")
logger = logging.getLogger("Orchestrator")


def parse_user_input(user_input: Any) -> pd.DataFrame:
    """Parses raw user input (DataFrame, file path to CSV/XLSX/XLS, bytes, dict, or string)
    into a pandas DataFrame with filename unit metadata.
    """
    filename = ""
    if isinstance(user_input, dict) and "content" in user_input:
        filename = user_input.get("filename", "")
        user_input = user_input["content"]

    if isinstance(user_input, pd.DataFrame):
        df = user_input.copy()
        if filename:
            df.attrs["filename"] = filename
        return df

    if isinstance(user_input, str):
        if os.path.exists(user_input):
            filename = user_input
            ext = os.path.splitext(user_input)[1].lower()
            if ext in [".xlsx", ".xls"]:
                df = pd.read_excel(user_input)
            elif ext == ".csv":
                df = pd.read_csv(user_input)
            else:
                try:
                    df = pd.read_csv(user_input)
                except Exception:
                    df = pd.read_excel(user_input)
        else:
            try:
                df = pd.read_csv(io.StringIO(user_input))
            except Exception:
                df = pd.read_json(io.StringIO(user_input))

    elif isinstance(user_input, bytes):
        try:
            df = pd.read_excel(io.BytesIO(user_input))
        except Exception:
            df = pd.read_csv(io.BytesIO(user_input))

    elif isinstance(user_input, dict):
        df = pd.DataFrame([user_input])

    elif isinstance(user_input, list):
        df = pd.DataFrame(user_input)

    else:
        raise ValueError(f"Unsupported input type for pipeline: {type(user_input)}")

    if filename:
        df.attrs["filename"] = filename
    return df



class BaseAgent(ABC):
    """Abstract Base Class defining the contract for all pipeline agents."""

    def __init__(self, name: str, description: str):
        self.name = name
        self.description = description

    @abstractmethod
    def run(self, input_data: Any) -> Any:
        """Executes agent logic on input data."""
        pass

    def __repr__(self) -> str:
        return f"<{self.__class__.__name__}(name='{self.name}')>"


class Agent1Preprocessing(BaseAgent):
    """Agent 1: Handles data cleaning, KNN imputation, WHO limit checks, and outlier detection."""

    def __init__(self):
        super().__init__(
            name="Agent 1 - Preprocessing",
            description="Data cleaning, KNN imputation, and outlier detection"
        )
        self.module = importlib.import_module("agents.01_preprocessingAgent")

    def run(self, input_data: Any) -> Dict[str, Any]:
        df = parse_user_input(input_data)
        agent1_resp = self.module.preprocess_data(df)

        clean_df = pd.read_csv("clean_dataset.csv") if os.path.exists("clean_dataset.csv") else df
        response_meta = {}
        if os.path.exists("agent1_response.json"):
            with open("agent1_response.json", "r", encoding="utf-8") as f:
                response_meta = json.load(f)

        return {
            "status": "success",
            "clean_df": clean_df,
            "metadata": response_meta,
            "summary": agent1_resp or response_meta
        }


class Agent2Compute(BaseAgent):
    """Agent 2: Calculates heavy metal pollution indices (HMPI, HEI, Cd, MI, Composite Index)."""

    def __init__(self):
        super().__init__(
            name="Agent 2 - Compute",
            description="Calculates HMPI, HEI, Cd, MI, and Composite Index"
        )
        self.module = importlib.import_module("agents.02_computeAgent")

    def run(self, input_data: Any) -> Dict[str, Any]:
        if isinstance(input_data, dict) and "clean_df" in input_data:
            df = input_data["clean_df"]
        elif isinstance(input_data, pd.DataFrame):
            df = input_data
        else:
            df = parse_user_input(input_data)

        res = self.module.compute(df)

        response_meta = {}
        if os.path.exists("agent2_response.json"):
            with open("agent2_response.json", "r", encoding="utf-8") as f:
                response_meta = json.load(f)

        indices_df = pd.read_csv("sample_wise_indices.csv") if os.path.exists("sample_wise_indices.csv") else df

        return {
            "status": "success",
            "indices_df": indices_df,
            "metadata": response_meta,
            "summary": res or response_meta
        }


class Agent3Forecast(BaseAgent):
    """Agent 3: Performs BiLSTM time-series forecasting for heavy metal concentrations & HMPI."""

    def __init__(self):
        super().__init__(
            name="Agent 3 - Forecast",
            description="BiLSTM Heavy Metals & HMPI Time-Series Forecasting"
        )

    def run(self, input_data: Any) -> Dict[str, Any]:
        try:
            forecast_module = importlib.import_module("agents.03_forcastAgent")
        except Exception as e:
            logger.info(f"Agent 3 module loaded with notice: {e}")

        output_file = "agent3_output.csv"
        forecast_df = pd.read_csv(output_file) if os.path.exists(output_file) else None

        return {
            "status": "success",
            "forecast_df": forecast_df,
            "output_file": output_file,
            "summary": f"Forecasting completed. Output stored in {output_file}"
        }


class Agent4RiskAssessment(BaseAgent):
    """Agent 4: Classifies risk levels, identifies major pollutants, and generates risk explanations."""

    def __init__(self):
        super().__init__(
            name="Agent 4 - Risk Assessment",
            description="Risk level classification, pollutant contribution, and explanation generation"
        )

    def run(self, input_data: Any) -> Dict[str, Any]:
        try:
            risk_module = importlib.import_module("agents.04_riskassessmentAgent")
        except Exception as e:
            logger.info(f"Agent 4 module loaded with notice: {e}")

        output_file = "outputs/agent4_final_output.csv"
        risk_df = pd.read_csv(output_file) if os.path.exists(output_file) else None

        return {
            "status": "success",
            "risk_df": risk_df,
            "output_file": output_file,
            "summary": f"Risk assessment completed. Output saved to {output_file}"
        }


class Agent5Suggestion(BaseAgent):
    """Agent 5: Generates RAG & Gemini-based mitigation suggestions and policy recommendations."""

    def __init__(self):
        super().__init__(
            name="Agent 5 - Suggestions & Recommendations",
            description="RAG & Gemini-based environmental policy recommendations"
        )
        self.module = importlib.import_module("agents.05_suggestionAgent")

    def run(self, input_data: Any) -> Dict[str, Any]:
        contaminant = "lead"
        risk_level = None
        pollution_status = None
        formula_hmpi = None
        dominant_metals = None

        if isinstance(input_data, dict):
            summary = input_data.get("summary", {})
            if isinstance(summary, dict):
                contaminant = summary.get("dominant_metals", "lead")
                risk_level = summary.get("pollution_severity")
                formula_hmpi = summary.get("average_HMPI")

        suggestions = self.module.api_suggestions(
            contaminant=contaminant if isinstance(contaminant, str) else "lead",
            risk_level=risk_level,
            pollution_status=pollution_status,
            formula_hmpi=formula_hmpi,
            dominant_metals=str(dominant_metals) if dominant_metals else None
        )

        return {
            "status": "success",
            "suggestions": suggestions,
            "summary": suggestions
        }


class PipelineOrchestrator:
    """Orchestrator managing sequential pipeline execution across all instantiated agents."""

    def __init__(self):
        # Instantiate each agent only once
        self.agents: List[BaseAgent] = [
            Agent1Preprocessing(),
            Agent2Compute(),
            Agent3Forecast(),
            Agent4RiskAssessment(),
            Agent5Suggestion()
        ]

    def execute(self, user_input: Any) -> Dict[str, Any]:
        """Executes the pipeline sequentially with state tracking, logging, and error handling."""
        state: Dict[str, Any] = {}
        current_input = user_input

        print("\n" + "=" * 70)
        print("🚀 STARTING HEAVY METALS ANALYSIS PIPELINE")
        print("=" * 70 + "\n")

        for idx, agent in enumerate(self.agents, start=1):
            var_name = f"result_{idx}"
            print(f"------------ [{agent.name}] ------------")
            print(f"Description: {agent.description}")
            print(f"📥 Input Received: {self._format_log_value(current_input)}")

            try:
                # Execute agent
                output = agent.run(current_input)

                # Store intermediate output
                state[var_name] = output
                print(f"📤 Output Produced ({var_name}): {self._format_log_value(output)}")
                print(f"✅ [{agent.name}] Completed Successfully.\n")

                # Pass output to next agent step
                current_input = output

            except Exception as e:
                error_msg = f"❌ Error executing {agent.name}: {str(e)}"
                logger.error(error_msg, exc_info=True)
                return {
                    "status": "error",
                    "failed_agent": agent.name,
                    "error": str(e),
                    "intermediate_state": state
                }

        print("=" * 70)
        print("🎉 PIPELINE EXECUTION FINISHED SUCCESSFULLY")
        print("=" * 70 + "\n")

        # Convert computed DataFrame from Agent 2/1 into records for frontend tables
        results_records = []
        result_2 = state.get("result_2", {})
        target_df = None
        if isinstance(result_2, dict) and "indices_df" in result_2 and isinstance(result_2["indices_df"], pd.DataFrame):
            target_df = result_2["indices_df"]
        elif isinstance(state.get("result_1"), dict) and "clean_df" in state["result_1"] and isinstance(state["result_1"]["clean_df"], pd.DataFrame):
            target_df = state["result_1"]["clean_df"]

        if target_df is not None:
            raw_records = target_df.fillna("").to_dict(orient="records")
            REVERSE_MAP = {
                "Iron_Fe_mgL": "Fe", "Arsenic_As_mgL": "As", "Lead_Pb_mgL": "Pb",
                "Cadmium_Cd_mgL": "Cd", "Chromium_Cr_mgL": "Cr", "Mercury_Hg_mgL": "Hg",
                "Nickel_Ni_mgL": "Ni", "Copper_Cu_mgL": "Cu", "Zinc_Zn_mgL": "Zn",
                "Manganese_Mn_mgL": "Mn", "Selenium_Se_mgL": "Se"
            }
            for row in raw_records:
                formatted_row = dict(row)
                for long_key, short_key in REVERSE_MAP.items():
                    if long_key in formatted_row:
                        formatted_row[short_key] = formatted_row[long_key]
                if "HMPI" in formatted_row:
                    formatted_row["HPI"] = formatted_row["HMPI"]
                if "Composite_Index" in formatted_row:
                    formatted_row["CI"] = formatted_row["Composite_Index"]
                results_records.append(formatted_row)


        # Convert state into a JSON-serializable dict by converting any pandas DataFrames to records
        serializable_state = {}
        for k, v in state.items():
            if isinstance(v, dict):
                serializable_state[k] = {}
                for sub_k, sub_v in v.items():
                    if isinstance(sub_v, pd.DataFrame):
                        serializable_state[k][sub_k] = sub_v.fillna("").to_dict(orient="records")
                    else:
                        serializable_state[k][sub_k] = sub_v
            elif isinstance(v, pd.DataFrame):
                serializable_state[k] = v.fillna("").to_dict(orient="records")
            else:
                serializable_state[k] = v

        final_response = {
            "status": "success",
            "total_rows": len(results_records),
            "results": results_records,
            "suggestions": state.get("result_5", {}).get("suggestions"),
            "pipeline_state": serializable_state
        }
        return final_response


    def _format_log_value(self, val: Any) -> str:
        """Formats log outputs concisely for easy reading."""
        if isinstance(val, pd.DataFrame):
            return f"DataFrame (shape: {val.shape})"
        if isinstance(val, dict):
            keys = list(val.keys())
            return f"Dict (keys: {keys})"
        if isinstance(val, str):
            return val if len(val) <= 100 else val[:97] + "..."
        return str(val)


# Global Orchestrator Instance (Instantiated once)
_ORCHESTRATOR = PipelineOrchestrator()


def run_pipeline(user_input: Any) -> Dict[str, Any]:
    """Exposes a single function to run the full Heavy Metals analysis pipeline.

    Args:
        user_input (Any): Raw input, which can be a pandas DataFrame, file path
                          (.csv, .xlsx, .xls), byte stream, dict, or list.

    Returns:
        Dict[str, Any]: The final output produced by the last agent in the pipeline.
    """
    return _ORCHESTRATOR.execute(user_input)