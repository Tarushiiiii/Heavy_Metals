import { useState, useEffect } from "react";
import { KeyRound } from "lucide-react";
import { Button } from "../ui/button";
import { handleAPIUpload } from "../../utils/functions/apiUpload";
import { useViewReport } from "../../utils/functions/utility";
import { useReportStore } from "../../store/reportStore";

export default function APIUpload() {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const setReports = useReportStore((state) => state.setReports);

  useEffect(() => {
    if (prediction) {
      const decoded = prediction.Decoded_Input || {};
      const lat = parseFloat(decoded.latitude ?? decoded.Latitude ?? decoded.lat ?? 28.7041);
      const lng = parseFloat(decoded.longitude ?? decoded.Longitude ?? decoded.lng ?? 77.1025);
      
      const report = {
        region: decoded.district || "API Location",
        date: decoded.date ?? decoded.Sampling_Date ?? new Date().toISOString().slice(0, 10),
        metal: "N/A",
        hpi: prediction.Formula_HMPI,
        ci: prediction.CI,
        status: prediction.Risk_Level || "Safe",
        lat: lat,
        lng: lng,
        cause: `API decoded values analysis. HPI = ${prediction.Formula_HMPI.toFixed(2)}, Risk Level = ${prediction.Risk_Level || 'N/A'}.`,
        ml: "N/A"
      };
      setReports([report]);
    }
  }, [prediction, setReports]);

  const viewReport = useViewReport();

  const onChangeApiKey = (e) => {
    setApiKey(e.target.value);
    setError(null); // type karte hi error hata do (optional)
  };

  return (
    <div id="bulk-upload-form" className="tab-content active">
      <h2 className="card-title">
        <KeyRound size={24} strokeWidth={2.5} />
        Process API Data
      </h2>

      <div className="card">
        <div className="input-group">
          <label htmlFor="api_key">API Key</label>
          <input
            type="text"
            id="api_key"
            placeholder="Enter your Data API key"
            value={apiKey}
            onChange={onChangeApiKey}
          />
          {error && <p className="text-xs mt-1 !text-red-500">{error}</p>}
        </div>
      </div>

      <div className="requirements-card">
        <h3>File Format Requirements:</h3>
        <ul>
          <li>First row should contain column headers</li>
          <li>Include columns: sample_id, latitude, longitude, depth</li>
          <li>Heavy metal columns: Pb, Cd, Hg, As, Cr, Cu, Zn, Ni</li>
          <li>Use numeric values only for concentrations</li>
        </ul>
      </div>

      <div className="button-container">
        <button
          type="submit"
          className="btn calculate-btn"
          onClick={(e) =>
            handleAPIUpload(e, apiKey, setLoading, setPrediction, setError)
          }
        >
          {loading ? "Calculating..." : "Calculate HMPI"}
        </button>
      </div>
      <br />
      {prediction && (
        <div className="center">
          <div>
            <h3 className="calculated-title">Calculated Values:</h3>
            <ul className="calculated-list">
             <li
                className={`classification-box ${
                  prediction.Formula_HMPI < 50
                    ? "safe"
                    : prediction.Formula_HMPI <= 100
                    ? "moderate"
                    : "elevated"
                }`}
              >
                <b>HPI:</b> {prediction.Formula_HMPI.toFixed(4)}
              </li>
              <li
                className={`classification-box ${
                  prediction.HEI < 40
                    ? "safe"
                    : prediction.HEI <= 80
                    ? "moderate"
                    : "elevated"
                }`}
              >
                <b>HEI:</b> {prediction.HEI.toFixed(4)}
              </li>
              <li
                className={`classification-box ${
                  prediction.Cd_Excess < 8 ? "safe" : prediction.Cd_Excess < 32 ? "moderate" : "elevated"
                }`}
              >
                <b>Cd:</b> {prediction.Cd_Excess.toFixed(4)}
              </li>
             <li
                className={`classification-box ${
                  prediction.MI < 1 ? "safe" : "elevated"
                }`}
              >
                <b>MI:</b> {prediction.MI.toFixed(4)}
              </li>
              {/* <li>CI: {prediction.CI}</li> */}
            </ul>
          </div>
          <Button
            type="main"
            colorVariant="secondary"
            onClickHandler={() => viewReport(prediction)}
          >
            View Detailed Report
          </Button>
        </div>
      )}
    </div>
  );
}
