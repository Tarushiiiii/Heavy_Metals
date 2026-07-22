import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../components/ui/css/analysis.css";
import {
  ChartLine,
  FileWarning,
  FlaskConical,
  TriangleAlert,
} from "lucide-react";
import Graphs from "../components/graphs/graphs.jsx";
import PieChart from "../components/graphs/pieChart.jsx";
import CompositeIndexChart from "../components/graphs/advanced/CompositeIndexChart.jsx";
import CorrelationHeatmap from "../components/graphs/advanced/CorrelationHeatmap";
import EnrichmentFactorChart from "../components/graphs/advanced/EnrichmentFactorChart.jsx";
import ResultStandardsChart from "../components/graphs/advanced/ResultStandardsChart";
import ForecastingTrendChart from "../components/graphs/advanced/ForecastingTrendChart";
import Summary from "../components/graphs/advanced/Summary.jsx";
import Overview from "../components/graphs/advanced/Overview.jsx";
import StateCumulativeChart from "../components/graphs/advanced/StateCumulativeChart.jsx";
import HandleExport from "../utils/declaration";
import { SelectContam } from "../components/analysis/selectContam.jsx";


const transformGraphData = (payload) => {
  if (!payload) return null;

  const isBulk = Array.isArray(payload) || Array.isArray(payload?.results) || Array.isArray(payload?.records) || Array.isArray(payload?.fullData);

  const records = isBulk
    ? (payload.results || payload.records || payload.fullData || (Array.isArray(payload) ? payload : []))
    : [];

  const metalsList = ["Pb", "Cd", "Cr", "As", "Zn", "Fe", "Cu", "Ni", "Mn", "Hg", "Se"];
  const pie = [];

  if (isBulk && records.length > 0) {
    const sums = {};
    const counts = {};
    metalsList.forEach((m) => {
      sums[m] = 0;
      counts[m] = 0;
    });

    records.forEach((row) => {
      metalsList.forEach((m) => {
        const val = row[m] ?? row[`${m}_mgL`] ?? row[m.toLowerCase()];
        if (val !== undefined && val !== null && !isNaN(val)) {
          sums[m] += Number(val);
          counts[m] += 1;
        }
      });
    });

    metalsList.forEach((m) => {
      if (counts[m] > 0) {
        pie.push({ label: m, value: Number((sums[m] / counts[m]).toFixed(4)) });
      }
    });
  } else {
    // Single sample
    const metalsInput = payload.Decoded_Input || {};
    metalsList.forEach((m) => {
      const val = metalsInput[m] ?? payload[m] ?? payload[`${m}_mgL`] ?? payload[m.toLowerCase()];
      if (val !== undefined && val !== null && !isNaN(val)) {
        pie.push({ label: m, value: Number(val) });
      }
    });
  }

  let composite = null;
  let formulaHMPI = 0;
  let hei = 0;
  let mi = 0;
  let cd = 0;

  if (isBulk && records.length > 0) {
    const stateMap = {};
    records.forEach((row) => {
      const rawState = row.State || row.state || row.Region || row.region || row.Location || row.location;
      const stateName = rawState ? String(rawState).trim() : "Submitted Dataset";

      if (!stateMap[stateName]) {
        stateMap[stateName] = {
          name: stateName,
          count: 0,
          totalHMPI: 0,
          totalHEI: 0,
          totalCd: 0,
          totalMI: 0,
        };
      }

      const st = stateMap[stateName];
      st.count += 1;
      st.totalHMPI += Number(row.HMPI || row.Formula_HMPI || row.ML_Predicted_HMPI || row.HPI || row.hpi || 0);
      st.totalHEI += Number(row.HEI || row.hei || 0);
      st.totalCd += Number(row.Cd || row.Cd_Excess || row.cd || 0);
      st.totalMI += Number(row.MI || row.mi || 0);
    });

    const series = Object.values(stateMap).map((st) => ({
      name: st.name,
      data: [
        Number((st.totalHMPI / st.count).toFixed(2)),
        Number((st.totalHEI / st.count).toFixed(2)),
        Number((st.totalMI / st.count).toFixed(2)),
        Number((st.totalCd / st.count).toFixed(2)),
      ],
    }));

    composite = {
      labels: ["HMPI", "HEI", "MI", "Cd"],
      series,
    };
  } else {
    formulaHMPI = Number(payload.Formula_HMPI || payload.ML_Predicted_HMPI || 0);
    hei = Number(payload.HEI || 0);
    mi = Number(payload.MI || 0);
    cd = Number(payload.Cd_Excess || payload.Cd || 0);

    composite = {
      labels: ["HMPI", "HEI", "MI", "Cd"],
      series: [
        {
          name: payload?.Decoded_Input?.sample_id || "Prediction Result",
          data: [formulaHMPI, hei, mi, cd],
        },
      ],
    };
  }

  return {
    composite,
    pie: pie.length > 0 ? pie : null,
    formulaHMPI,
    hei,
    mi,
    cd,
  };
};

export const Analysis = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);
  const [chartProps, setChartProps] = useState(null);

  // Keep a debug log so you can inspect what arrives
  useEffect(() => {
    console.debug("Analysis: location change", {
      pathname: location.pathname,
      search: location.search,
      state: location.state,
      key: location.key,
    });

    if (location.state && location.state.analysis) {
      const payload = location.state.analysis;
      setAnalysis(payload);
      try {
        const transformed = transformGraphData(payload);
        setChartProps(transformed);
      } catch (err) {
        console.warn("transformGraphData failed", err);
        setChartProps(null);
      }
      return;
    }

    // No state provided — clear any previous analysis (shows CTA)
    setAnalysis(null);
    setChartProps(null);
  }, [location.key, location.search, location.state, location.pathname]); 

  // Demo click handler — navigates with a tiny unique query so router treats it as new navigation
  const onClickDemo = (e) => {
    e?.preventDefault?.();
    const demo = {
      Decoded_Input: {
        Pb: 0.02,
        Cd: 0.004,
        Cr: 0.06,
        As: 0.02,
        Zn: 1.2,
        Fe: 0.5,
        Cu: 0.8,
      },
      ML_Predicted_HMPI: 65.3,
      Formula_HMPI: 70.3,
      HEI: 40,
      Cd_Excess: 0.001,
      MI: 20,
      CI: 70.3,
      Pollution_Status: "Moderate Pollution",
      Risk_Level: "Medium Risk",
    };

    const target = "/user/analysis"; // ensure this matches your route exactly
    const unique = Date.now();
    navigate(`${target}?t=${unique}`, { state: { analysis: demo }, replace: false });
  };

  // If no analysis arrived via navigation, show CTA to go to calculate page
  if (!analysis) {
    return (
      <div className="results-page" style={{ padding: "2rem" }}>
        <div>


          <div className="results-card">
            <h2 className="card-title">
              <ChartLine size={20} strokeWidth={2} />
              No Analysis Found
            </h2>

            <p>
              Go to the Calculate page and submit your input (API Key / file /
              manual entry). After calculation, click <b>View Detailed Report</b>{" "}
              to open this page with live results.
            </p>

            <div style={{ marginTop: 16 }}>
              <button
                className="btn"
                onClick={() => {
                  navigate("/user/calculate_hmpi"); // change route if your calculate page path differs
                }}
              >
                Go to Calculate Page
              </button>

              <button className="btn ml-2" onClick={onClickDemo}>
                Use Demo Data
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isBulk = Array.isArray(analysis) || Array.isArray(analysis?.results) || Array.isArray(analysis?.records) || Array.isArray(analysis?.fullData);

  const records = isBulk
    ? (analysis.results || analysis.records || analysis.fullData || (Array.isArray(analysis) ? analysis : []))
    : [];

  const totalSamples = isBulk ? records.length : 1;

  const rawHmpi = isBulk
    ? (records.reduce((acc, row) => acc + Number(row.HMPI || row.Formula_HMPI || row.HPI || 0), 0) / totalSamples)
    : Number(analysis?.Formula_HMPI || analysis?.ML_Predicted_HMPI || analysis?.HMPI || analysis?.HPI || 0);

  const sampleIdValue = isBulk
    ? `Bulk Dataset (${totalSamples} samples)`
    : (analysis?.Decoded_Input?.sample_id || "Single Sample");

  const coordinatesValue = isBulk
    ? "Multiple Locations"
    : (analysis?.Decoded_Input?.coordinates || "40.7128, -74.0060");

  const depthValue = isBulk
    ? "N/A"
    : (analysis?.Decoded_Input?.depth || "15.5 m");

  let pollutionStatusValue = "N/A";
  let riskLevelValue = "N/A";
  if (isBulk) {
    if (rawHmpi > 100) {
      pollutionStatusValue = "High Pollution";
      riskLevelValue = "High Risk";
    } else if (rawHmpi > 50) {
      pollutionStatusValue = "Moderate Pollution";
      riskLevelValue = "Medium Risk";
    } else {
      pollutionStatusValue = "Safe";
      riskLevelValue = "Low Risk";
    }
  } else {
    pollutionStatusValue = analysis?.Pollution_Status || "N/A";
    riskLevelValue = analysis?.Risk_Level || "N/A";
  }

  // Render analysis view when analysis object is present
  return (
    <div>
      <div className="main-header-wrapper">
        <div className="main-header">Analysis</div>
        <div className="main-text">
          Visualize and interpret your HMPI results with detailed breakdowns,
          risk assessments, and expert recommendations.
        </div>
      </div>
      <main className="results-page">
        <div className="results-header">
          <HandleExport />
          <div className="suggestion-group yellow px-4 py-2 rounded flex items-center gap-2">
            <div className="warning-text">
              <FileWarning size={24} strokeWidth={1.8} />
              For the privacy concerns we do not store any data on our
              servers. If you wish then click to save your results locally.
            </div>
          </div>
        </div>

        <SelectContam />

        <div id="report-content">
          {/* Sample Information */}
          <div className="results-card">
            <h2 className="card-title">
              <FlaskConical size={20} strokeWidth={2} />
              Sample/Dataset Information
            </h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Source</span>
                <span className="info-value">
                  {sampleIdValue}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Coordinates</span>
                <span className="info-value">
                  {coordinatesValue}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Depth</span>
                <span className="info-value">
                  {depthValue}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Date</span>
                <span className="info-value">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* HMPI Assessment */}
          <div className="results-card">
            <h2 className="card-title">
              <ChartLine size={20} strokeWidth={2} />
              HMPI Assessment
            </h2>
            <div className="hmpi-assessment">
              <div className="hmpi-score">
                <p className="score-value">
                  {rawHmpi ? rawHmpi.toFixed(2) : "—"}
                </p>
                <p className="score-label">{isBulk ? "Average HMPI" : "HMPI Score"}</p>
              </div>
              <div className="hmpi-status">
                <div
                  className={`classification-box ${pollutionStatusValue === "Moderate Pollution"
                    ? "moderate"
                    : pollutionStatusValue === "High Pollution"
                      ? "high"
                      : "safe"
                    }`}
                >
                  {pollutionStatusValue}
                </div>
                <p className="status-subtext">Pollution Classification</p>
              </div>
              <div className="hmpi-risk">
                <p
                  className={`risk-level ${riskLevelValue === "High Risk"
                    ? "high"
                    : riskLevelValue === "Medium Risk"
                      ? "moderate"
                      : "low"
                    }`}
                >
                  <TriangleAlert size={20} strokeWidth={2} />
                  {riskLevelValue}
                </p>
              </div>
            </div>
            <div className="risk-bar">
              <div className="risk-bar-track">
                <div
                  className="risk-bar-fill moderate-fill"
                  style={{
                    width: `${Math.min(100, (rawHmpi / 200) * 100)}%`,
                  }}
                ></div>
              </div>
              <div className="risk-labels">
                <span>Safe (0-50)</span>
                <span>Moderate (50-100)</span>
                <span>High Risk (100+)</span>
              </div>
            </div>
          </div>

          {/* Detailed Analysis Section */}
          <div>
            <Overview analysis={analysis} />
            <StateCumulativeChart rawData={analysis} />
            <div className="results-card">
              <h2 className="section-title text-2xl">
                Individual Heavy Metal Analysis
              </h2>
              <p className="section-subtitle">
                Detailed breakdown of each heavy metal concentration.
              </p>
              <Graphs chartProps={chartProps} rawAnalysis={analysis} />
            </div>
            <div>
              <div className="chart-grid">
                <CompositeIndexChart compositeData={chartProps?.composite || analysis} />
                <PieChart rawData={analysis} data={chartProps?.pie} />
              </div>

              {/* <CorrelationHeatmap data={chartProps?.correlation} />
                <EnrichmentFactorChart data={chartProps?.enrichment} />
                <ResultStandardsChart data={chartProps?.standards} /> */}
              {/* <ForecastingTrendChart data={chartProps?.timeseries} /> */}
              <Summary analysis={analysis} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analysis;
