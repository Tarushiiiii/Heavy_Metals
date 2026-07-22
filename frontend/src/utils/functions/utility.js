import { useNavigate } from "react-router-dom";
import { WHO_LIMITS } from "../constants";

export function useViewReport(options = {}) {
  const navigate = useNavigate();

  const viewReport = (data) => {
    // Safely extract prediction/analysis object regardless of argument format
    const targetData =
      data?.prediction !== undefined
        ? data.prediction
        : data !== undefined
          ? data
          : options?.prediction;

    if (targetData) {
      navigate("/user/analysis", { state: { analysis: targetData } });
    } else {
      navigate("/user/analysis");
    }
  };

  return viewReport;
}

// Metal configuration mapping WHO_LIMITS keys to possible row property aliases
const METAL_CONFIG = [
  { name: "Lead", key: "Lead_Pb_mgL", aliases: ["Lead_Pb_mgL", "Lead", "Pb", "lead", "pb"] },
  { name: "Arsenic", key: "Arsenic_As_mgL", aliases: ["Arsenic_As_mgL", "Arsenic", "As", "arsenic", "as"] },
  { name: "Copper", key: "Copper_Cu_mgL", aliases: ["Copper_Cu_mgL", "Copper", "Cu", "copper", "cu"] },
  { name: "Iron", key: "Iron_Fe_mgL", aliases: ["Iron_Fe_mgL", "Iron", "Fe", "iron", "fe"] },
  { name: "Mercury", key: "Mercury_Hg_mgL", aliases: ["Mercury_Hg_mgL", "Mercury", "Hg", "mercury", "hg"] },
  { name: "Chromium", key: "Chromium_Cr_mgL", aliases: ["Chromium_Cr_mgL", "Chromium", "Cr", "chromium", "cr"] },
  { name: "Manganese", key: "Manganese_Mn_mgL", aliases: ["Manganese_Mn_mgL", "Manganese", "Mn", "manganese", "mn"] },
  { name: "Nickel", key: "Nickel_Ni_mgL", aliases: ["Nickel_Ni_mgL", "Nickel", "Ni", "nickel", "ni"] },
  { name: "Cadmium", key: "Cadmium_Cd_mgL", aliases: ["Cadmium_Cd_mgL", "Cadmium", "Cd", "cadmium", "cd"] },
  { name: "Zinc", key: "Zinc_Zn_mgL", aliases: ["Zinc_Zn_mgL", "Zinc", "Zn", "zinc", "zn"] },
  { name: "Selenium", key: "Selenium_Se_mgL", aliases: ["Selenium_Se_mgL", "Selenium", "Se", "selenium", "se"] },
];

/**
 * Calculates dominant metal based on (input concentration / WHO limit) ratio
 */
export const getDominantMetal = (row) => {
  if (!row || typeof row !== "object") return "Heavy Metals";

  let maxRatio = -1;
  let dominant = null;

  for (const item of METAL_CONFIG) {
    const limit = WHO_LIMITS[item.key] || 1; // Limit in mg/L
    let val = undefined;

    // Look up concentration in row, row.Decoded_Input, or row.valuesInUgPerL
    for (const alias of item.aliases) {
      if (row[alias] !== undefined && row[alias] !== null && row[alias] !== "") {
        val = parseFloat(row[alias]);
        if (!isNaN(val)) break;
      }
      if (row.Decoded_Input && row.Decoded_Input[alias] !== undefined) {
        val = parseFloat(row.Decoded_Input[alias]);
        if (!isNaN(val)) break;
      }
      if (row.valuesInUgPerL && row.valuesInUgPerL[alias] !== undefined) {
        const ugVal = parseFloat(row.valuesInUgPerL[alias]);
        if (!isNaN(ugVal)) {
          val = ugVal / 1000; // Convert ug/L to mg/L
          break;
        }
      }
    }

    if (val !== undefined && !isNaN(val) && val >= 0) {
      const ratio = val / limit;
      if (ratio > maxRatio) {
        maxRatio = ratio;
        dominant = item.name;
      }
    }
  }

  if (dominant && maxRatio > 0) {
    return dominant;
  }

  // Fallback to explicit metal fields if concentration ratios aren't present
  const explicitMetal = row.metal ?? row.Major_Pollutants ?? row.major_pollutants ?? row.dominant_metal;
  if (explicitMetal && typeof explicitMetal === "string" && explicitMetal.trim() !== "" && explicitMetal !== "Heavy Metals") {
    const cleaned = explicitMetal.split(",")[0].trim();
    if (cleaned) return cleaned;
  }

  return "Heavy Metals";
};

export const getLocationName = (item) => {
  if (!item || typeof item !== "object") return "Sample Location";

  const region = (item.region || item.Region || item.place || item.Place || item.location || item.Location || "").trim();
  const district = (item.district || item.District || "").trim();
  const state = (item.state || item.State || "").trim();

  const parts = [];
  if (region) parts.push(region);
  if (district && district !== region) parts.push(district);
  if (state && state !== district && state !== region) parts.push(state);

  if (parts.length > 0) {
    return parts.join(", ");
  }

  return item.sample_id || item.Sample_ID || "Sample Location";
};

export const formatUploadedRecordsToReports = (records) => {
  if (!Array.isArray(records) || records.length === 0) return [];

  return records.map((row, idx) => {
    // 1. Latitude
    let lat = parseFloat(
      row.Latitude ?? row.latitude ?? row.Lat ?? row.lat ?? row.LATITUDE ?? row.LAT ?? 28.7041
    );
    if (isNaN(lat) || lat === 0) lat = 28.7041;

    // 2. Longitude
    let lng = parseFloat(
      row.Longitude ?? row.longitude ?? row.Lng ?? row.lng ?? row.LONGITUDE ?? row.LON ?? row.Lon ?? 77.1025
    );
    if (isNaN(lng) || lng === 0) lng = 77.1025;

    // 3. HPI / HMPI
    let hpi = parseFloat(
      row.HPI ?? row.HMPI ?? row.hpi ?? row.hmpi ?? row.Formula_HMPI ?? row.ML_Predicted_HMPI ?? row.Predicted_HMPI ?? 0
    );
    if (isNaN(hpi)) hpi = 0;

    // 4. CI / Composite Index
    let ci = parseFloat(
      row.CI ?? row.ci ?? row.Composite_Index ?? row.composite_index ?? row.HEI ?? row.hei ?? 0
    );
    if (isNaN(ci)) ci = hpi > 0 ? hpi / 100 : 0;

    // 5. Region / District / Location / Sample ID
    let sample_id = row.Sample_ID ?? row.sample_id ?? row.ID ?? row.id ?? row.Region_ID ?? row.region_id;
    if (!sample_id) {
      sample_id = `SMP-${String(idx + 1).padStart(3, '0')}`;
    }

    const region = row.region ?? row.Region ?? row.Place ?? row.place ?? row.Location ?? row.location ?? "";
    const district = row.District ?? row.district ?? row.City ?? row.city ?? "";
    const state = row.State ?? row.state ?? row.STATE ?? "";

    // 6. Metals & Date (Dominant metal computed from concentration / WHO limit ratio)
    const metal = getDominantMetal(row);
    const date = row.date ?? row.Sampling_Date ?? row.sampling_date ?? new Date().toISOString().slice(0, 10);

    // 7. Status calculation
    let status = row.status ?? row.Pollution_Status ?? row.Risk_Level;
    if (!status) {
      status = ci >= 100 || hpi >= 100 ? "Critical" : (ci >= 50 || hpi >= 50 ? "Alert" : "Safe");
    }

    // 8. Cause & ML explanation
    const cause = row.Risk_Explanation ?? row.cause ?? (hpi >= 100 ? "High heavy metal concentrations exceeding permissible limits." : "Water quality parameters within safe threshold.");
    const ml = row.ml ?? row.Major_Pollutants ?? `Calculated HPI: ${hpi.toFixed(2)}, CI: ${ci.toFixed(2)}`;

    return {
      sample_id,
      region,
      district,
      state,
      date,
      metal,
      hpi: Number(hpi.toFixed(2)),
      ci: Number(ci.toFixed(2)),
      status,
      lat,
      lng,
      cause,
      ml
    };
  });
};
