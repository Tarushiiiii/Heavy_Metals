import pandas as pd
import numpy as np
import json
import joblib
import os

from sklearn.impute import KNNImputer
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import IsolationForest

from backend.utils.constants import WHO_LIMITS, metal_columns

def preprocess_data(df: pd.DataFrame) -> tuple:
    original_cols = list(df.columns)

    COLUMN_MAP = {
        "Fe": "Iron_Fe_mgL", "As": "Arsenic_As_mgL", "Pb": "Lead_Pb_mgL",
        "Cd": "Cadmium_Cd_mgL", "Cr": "Chromium_Cr_mgL", "Hg": "Mercury_Hg_mgL",
        "Ni": "Nickel_Ni_mgL", "Cu": "Copper_Cu_mgL", "Zn": "Zinc_Zn_mgL",
        "Mn": "Manganese_Mn_mgL", "Se": "Selenium_Se_mgL",
        "Cr (PPM)": "Chromium_Cr_mgL", "Mn (PPM)": "Manganese_Mn_mgL",
        "Fe (PPM)": "Iron_Fe_mgL", "Ni (PPM)": "Nickel_Ni_mgL",
        "Cu (PPM)": "Copper_Cu_mgL", "Zn (PPM)": "Zinc_Zn_mgL",
        "As (PPM)": "Arsenic_As_mgL", "Pb (PPB)": "Lead_Pb_mgL"
    }
    
    # Track if Lead was in PPB units in original dataset
    is_pb_ppb = any(c in original_cols for c in ["Pb (PPB)", "Pb_ppb", "Lead_Pb_ppb", "Pb (ppb)"])

    # Rename columns safely by avoiding duplicate columns
    rename_dict = {}
    for old_col, new_col in COLUMN_MAP.items():
        if old_col in df.columns:
            if new_col in df.columns:
                # If target column already exists, we drop the old column (likely a pre-calculated index or redundant column)
                df = df.drop(columns=[old_col])
            else:
                rename_dict[old_col] = new_col
    df = df.rename(columns=rename_dict)

    filename = getattr(df, "attrs", {}).get("filename", "")
    is_ppb_file = "ppb" in str(filename).lower() or any("ppb" in str(c).lower() for c in original_cols)

    # Convert PPB to mg/L ONLY if filename or column header explicitly specifies PPB
    for metal in metal_columns:
        if metal in df.columns:
            df[metal] = pd.to_numeric(df[metal], errors="coerce")
            if is_ppb_file or (metal == "Lead_Pb_mgL" and is_pb_ppb):
                df[metal] = df[metal] / 1000.0



    # BDL (Below Detection Limit) replacement with Limit / 2
    BDL_LIMITS = {
        "Arsenic_As_mgL": 0.001, "Cadmium_Cd_mgL": 0.0001, "Chromium_Cr_mgL": 0.001,
        "Copper_Cu_mgL": 0.001, "Iron_Fe_mgL": 0.005, "Lead_Pb_mgL": 0.0005,
        "Manganese_Mn_mgL": 0.001, "Nickel_Ni_mgL": 0.001, "Zinc_Zn_mgL": 0.001,
        "Mercury_Hg_mgL": 0.0001, "Selenium_Se_mgL": 0.001,
    }

    for metal, bdl in BDL_LIMITS.items():
        if metal in df.columns:
            df[metal] = df[metal].replace(["BDL", "BDL ", "<BDL", "0", 0, None], bdl / 2)
            df[metal] = pd.to_numeric(df[metal], errors="coerce").fillna(bdl / 2)



    missing_values = int(df.isnull().sum().sum())
    duplicates = int(df.duplicated().sum())

    numeric_cols = df.select_dtypes(include=np.number).columns

    imputer = KNNImputer(n_neighbors=5)

    df[numeric_cols] = imputer.fit_transform(
        df[numeric_cols]
    )

    IGNORE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "ignore"))
    os.makedirs(IGNORE_DIR, exist_ok=True)

    joblib.dump(
        imputer,
        os.path.join(IGNORE_DIR, "agent1_imputer.pkl")
    )

    iso = IsolationForest(
        contamination=0.02,
        random_state=42
    )

    outlier_labels = iso.fit_predict(
        df[numeric_cols]
    )

    df["Outlier"] = outlier_labels

    outlier_count = int(
        (df["Outlier"]==-1).sum()
    )

    print(outlier_count)

    clean_df = df[
        df["Outlier"]==1
    ].copy()

    clean_df.drop(
        columns=["Outlier"],
        inplace=True
    )

    scaler = StandardScaler()

    scaled_features = scaler.fit_transform(
        clean_df[numeric_cols]
    )

    joblib.dump(
        scaler,
        os.path.join(IGNORE_DIR, "agent1_scaler.pkl")
    )


    critical_metals = []
    moderate_metals = []
    safe_metals = []

    for metal in metal_columns:
        if metal in clean_df.columns:
            avg_val = clean_df[metal].mean()
            limit = WHO_LIMITS[metal]
            ratio = avg_val / limit

            if ratio >= 5:
                critical_metals.append(metal)
            elif ratio >= 1:
                moderate_metals.append(metal)
            else:
                safe_metals.append(metal)

    contamination_scores = {}
    for metal in metal_columns:
        if metal in clean_df.columns:
            contamination_scores[metal] = (
                clean_df[metal].mean() / WHO_LIMITS[metal]
            )

    dominant_metals = sorted(
        contamination_scores,
        key=contamination_scores.get,
        reverse=True
    )[:5]

    critical_samples = 0
    for metal in metal_columns:
        if metal in clean_df.columns:
            critical_samples += int(
                (clean_df[metal] > WHO_LIMITS[metal]).sum()
            )

    state_risk = {}
    if "State" in clean_df.columns:
        for state in clean_df["State"].unique():
            temp = clean_df[clean_df["State"] == state]
            exceed_count = 0
            for metal in metal_columns:
                if metal in temp.columns:
                    exceed_count += (temp[metal] > WHO_LIMITS[metal]).sum()
            state_risk[state] = exceed_count

    top_states = sorted(
        state_risk,
        key=state_risk.get,
        reverse=True
    )[:5] if state_risk else []


    confidence = 100
    confidence -= missing_values * 0.05

    confidence -= duplicates * 0.05

    confidence -= outlier_count * 0.02

    confidence = max(
        confidence,
        0
    )

    confidence = round(
        confidence,
        2
    )

    if confidence >= 90:

        quality = "Excellent"

    elif confidence >= 75:

        quality = "Good"

    elif confidence >= 50:

        quality = "Average"

    else:

        quality = "Poor"

    agent1_response = {

        "rows_processed": int(len(clean_df)),

        "confidence_score": confidence,

        "dataset_quality": quality,

        "critical_metals": critical_metals,

        "moderate_metals": moderate_metals,

        "safe_metals": safe_metals,

        "dominant_contaminants": dominant_metals,

        "critical_samples": int(critical_samples),

        "top_contaminated_states": top_states,

        "outliers_detected": int(outlier_count),

        "ready_for_agent2": True

    }

    IGNORE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "ignore"))
    os.makedirs(IGNORE_DIR, exist_ok=True)

    agent1_json_path = os.path.join(IGNORE_DIR, "agent1_response.json")
    with open(agent1_json_path, "w") as f:
        json.dump(agent1_response, f, indent=4)

    clean_df.to_csv(os.path.join(IGNORE_DIR, "clean_dataset.csv"), index=False)

    return clean_df, agent1_response
