import pandas as pd
import numpy as np
import json
import os

try:
    from backend.utils.constants import WHO_LIMITS
except Exception:
    from utils.constants import WHO_LIMITS
    
IDEAL_VALUES = {
    metal: 0
    for metal in WHO_LIMITS
}

METAL_KEY_MAP = {
    "Iron_Fe_mgL": ["Iron_Fe_mgL", "Fe", "Fe (PPM)", "Iron"],
    "Arsenic_As_mgL": ["Arsenic_As_mgL", "As", "As (PPM)", "Arsenic"],
    "Lead_Pb_mgL": ["Lead_Pb_mgL", "Pb", "Pb (PPB)", "Lead"],
    "Cadmium_Cd_mgL": ["Cadmium_Cd_mgL", "Cd", "Cadmium"],
    "Chromium_Cr_mgL": ["Chromium_Cr_mgL", "Cr", "Cr (PPM)", "Chromium"],
    "Mercury_Hg_mgL": ["Mercury_Hg_mgL", "Hg", "Mercury"],
    "Nickel_Ni_mgL": ["Nickel_Ni_mgL", "Ni", "Ni (PPM)", "Nickel"],
    "Copper_Cu_mgL": ["Copper_Cu_mgL", "Cu", "Cu (PPM)", "Copper"],
    "Zinc_Zn_mgL": ["Zinc_Zn_mgL", "Zn", "Zn (PPM)", "Zinc"],
    "Manganese_Mn_mgL": ["Manganese_Mn_mgL", "Mn", "Mn (PPM)", "Manganese"],
    "Selenium_Se_mgL": ["Selenium_Se_mgL", "Se", "Selenium"]
}

def get_metal_val(row, metal):
    possible_keys = METAL_KEY_MAP.get(metal, [metal])
    for k in possible_keys:
        if k in row and pd.notna(row[k]) and str(row[k]).strip() != "":
            try:
                val = float(row[k])
                col_lower = str(k).lower()
                # Divide by 1000 ONLY if column header explicitly specifies PPB or ug/L
                if "ppb" in col_lower or "ug" in col_lower:
                    val = val / 1000.0
                return val
            except (ValueError, TypeError):
                continue
    return None



def calculate_hmpi(row):
    numerator = 0.0
    denominator = 0.0
    for metal in WHO_LIMITS:
        Mi = get_metal_val(row, metal)
        if Mi is not None:
            Si = WHO_LIMITS[metal]
            Ii = IDEAL_VALUES[metal]
            Wi = 1 / Si
            Qi = ((Mi - Ii) / (Si - Ii)) * 100
            numerator += (Wi * Qi)
            denominator += Wi
    return numerator / denominator if denominator > 0 else 0.0

def calculate_hei(row):
    """Cumulative Heavy Metal Evaluation Index: sum(Hc / Hmac)."""
    hei = 0.0
    for metal in WHO_LIMITS:
        Hc = get_metal_val(row, metal)
        if Hc is not None:
            Hmac = WHO_LIMITS[metal]
            hei += (Hc / Hmac)
    return hei

def calculate_cd(row):
    """Degree of Contamination (Cd): sum(max(0, CAi/CNi - 1)).
    Non-negative when concentrations are within safe limits.
    """
    cd = 0.0
    for metal in WHO_LIMITS:
        CA = get_metal_val(row, metal)
        if CA is not None:
            CN = WHO_LIMITS[metal]
            contamination_factor = (CA / CN) - 1.0
            if contamination_factor > 0:
                cd += contamination_factor
    return max(0.0, cd)

def calculate_mi(row):
    """Metal Index (MI): Mean ratio per metal across evaluated metals.
    MI = (1/N) * sum(Ci / MACi). Safe < 1.0, Elevated >= 1.0.
    """
    total_ratio = 0.0
    count = 0
    for metal in WHO_LIMITS:
        Ci = get_metal_val(row, metal)
        if Ci is not None:
            MAC = WHO_LIMITS[metal]
            total_ratio += (Ci / MAC)
            count += 1
    return (total_ratio / count) if count > 0 else 0.0

def composite_index(hmpi, hei, cd, mi):
    """Composite Index (CI): Weighted combination of indices, non-negative."""
    score = (0.40 * hmpi + 0.25 * hei + 0.20 * cd + 0.15 * (mi * 10.0))
    return max(0.0, score)



def severity(ci):
    if ci < 100:
        return "SAFE"
    elif ci < 300:
        return "MODERATE"
    else:
        return "CRITICAL"

def compute(df: pd.DataFrame) -> tuple:
    IGNORE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "ignore"))
    os.makedirs(IGNORE_DIR, exist_ok=True)

    agent1 = {}
    agent1_json_path = os.path.join(IGNORE_DIR, "agent1_response.json")
    if os.path.exists(agent1_json_path):
        with open(agent1_json_path, "r", encoding="utf-8") as file:
            agent1 = json.load(file)
    elif os.path.exists("agent1_response.json"):
        with open("agent1_response.json", "r", encoding="utf-8") as file:
            agent1 = json.load(file)

    HMPI = []
    HEI = []
    CD = []
    MI = []
    CI = []
    SEVERITY = []

    for index, row in df.iterrows():
        hmpi = calculate_hmpi(row)
        hei = calculate_hei(row)
        cd = calculate_cd(row)
        mi = calculate_mi(row)

        ci = composite_index(hmpi, hei, cd, mi)
        HMPI.append(hmpi)
        HEI.append(hei)
        CD.append(cd)
        MI.append(mi)
        CI.append(ci)
        SEVERITY.append(severity(ci))

    df["HMPI"] = HMPI
    df["HEI"] = HEI
    df["Cd"] = CD
    df["MI"] = MI
    df["Composite_Index"] = CI
    df["Severity"] = SEVERITY

    df.to_csv(os.path.join(IGNORE_DIR, "sample_wise_indices.csv"), index=False)

    average_hmpi = np.mean(HMPI) if len(HMPI) > 0 else 0
    maximum_hmpi = np.max(HMPI) if len(HMPI) > 0 else 0
    minimum_hmpi = np.min(HMPI) if len(HMPI) > 0 else 0
    average_hei = np.mean(HEI) if len(HEI) > 0 else 0
    average_cd = np.mean(CD) if len(CD) > 0 else 0
    average_mi = np.mean(MI) if len(MI) > 0 else 0
    average_ci = np.mean(CI) if len(CI) > 0 else 0

    critical_samples = int((df["Severity"] == "CRITICAL").sum())
    overall_severity = severity(average_ci)

    response = {
        "rows_processed": len(df),
        "average_HMPI": round(float(average_hmpi), 2),
        "maximum_HMPI": round(float(maximum_hmpi), 2),
        "minimum_HMPI": round(float(minimum_hmpi), 2),
        "average_HEI": round(float(average_hei), 2),
        "average_Cd": round(float(average_cd), 2),
        "average_MI": round(float(average_mi), 2),
        "average_Composite_Index": round(float(average_ci), 2),
        "pollution_severity": overall_severity,
        "critical_samples": critical_samples,
        "confidence_score": agent1.get("confidence_score", 100.0),
        "ready_for_agent3": True
    }

    with open(os.path.join(IGNORE_DIR, "agent2_response.json"), "w", encoding="utf-8") as file:
        json.dump(response, file, indent=4)

    return df, response

