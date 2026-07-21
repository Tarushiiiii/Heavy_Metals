WHO_LIMITS = {
    "Lead_Pb_mgL": 0.01,
    "Arsenic_As_mgL": 0.01,
    "Copper_Cu_mgL": 2.0,
    "Iron_Fe_mgL": 2.0,
    "Mercury_Hg_mgL": 0.001,
    "Chromium_Cr_mgL": 0.05,
    "Manganese_Mn_mgL": 0.5,
    "Nickel_Ni_mgL": 0.02,
    "Cadmium_Cd_mgL": 0.003,
    "Zinc_Zn_mgL": 3.0,
    "Selenium_Se_mgL": 0.04
}

metal_columns = [
    "Iron_Fe_mgL",
    "Arsenic_As_mgL",
    "Lead_Pb_mgL",
    "Cadmium_Cd_mgL",
    "Chromium_Cr_mgL",
    "Mercury_Hg_mgL",
    "Nickel_Ni_mgL",
    "Copper_Cu_mgL",
    "Zinc_Zn_mgL",
    "Manganese_Mn_mgL",
    "Selenium_Se_mgL"
]

required_columns = [
    "Region_ID",
    "State",
    "District",
    "Latitude",
    "Longitude",
    "Forecast_Year",
    "Predicted_HMPI",
    "Risk_Level",
    "Risk_Explanation",
    "Major_Pollutants",
    "Pollution_Source",
    "Confidence",
    "Confidence_Level"
]
