import { useNavigate } from "react-router-dom";

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
      row.HPI ?? row.HMPI ?? row.hpi ?? row.hmpi ?? row.Formula_HMPI ?? row.ML_Predicted_HMPI ?? 0
    );
    if (isNaN(hpi)) hpi = 0;

    // 4. CI / Composite Index
    let ci = parseFloat(
      row.CI ?? row.ci ?? row.Composite_Index ?? row.composite_index ?? row.HEI ?? row.hei ?? 0
    );
    if (isNaN(ci)) ci = hpi > 0 ? hpi / 100 : 0;

    // 5. Region / District / Location
    let region = "";
    const sampleId = row.Sample_ID ?? row.sample_id ?? row.ID ?? row.id;
    const district = row.District ?? row.district ?? row.Region ?? row.region ?? row.Location ?? row.location ?? row.City ?? row.city;
    const state = row.State ?? row.state;

    if (sampleId) region += `Sample ${sampleId}`;
    if (district) region += region ? ` (${district}` : `${district}`;
    if (state) region += district ? `, ${state})` : ` (${state})`;
    else if (district) region += `)`;
    if (!region) region = `Sample #${idx + 1}`;

    // 6. Metals & Date
    const metal = row.metal ?? row.Major_Pollutants ?? row.major_pollutants ?? "Heavy Metals";
    const date = row.date ?? row.Sampling_Date ?? row.sampling_date ?? new Date().toISOString().slice(0, 10);

    // 7. Status calculation
    let status = row.status ?? row.Pollution_Status ?? row.Risk_Level;
    if (!status) {
      status = ci >= 0.9 || hpi >= 100 ? "Critical" : (ci >= 0.5 || hpi >= 50 ? "Alert" : "Safe");
    }

    // 8. Cause & ML explanation
    const cause = row.Risk_Explanation ?? row.cause ?? (hpi >= 100 ? "High heavy metal concentrations exceeding permissible limits." : "Water quality parameters within safe threshold.");
    const ml = row.ml ?? row.Major_Pollutants ?? `Calculated HPI: ${hpi.toFixed(2)}, CI: ${ci.toFixed(2)}`;

    return {
      region,
      date,
      metal,
      hpi,
      ci,
      status,
      lat,
      lng,
      cause,
      ml
    };
  });
};
