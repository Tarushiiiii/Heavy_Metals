import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Example dataset — replace with actual computed values if available
const siteIndices = [
  {
    name: "Mayur Vihar",
    HPI: 78,
    HEI: 72,
    Cd: 65,
    MI: 70,
    CI: 76,
    classification: "Critical",
  },
  {
    name: "Dwarka Sec 23",
    HPI: 65,
    HEI: 60,
    Cd: 58,
    MI: 59,
    CI: 63,
    classification: "Alert",
  },
  {
    name: "Shahdara",
    HPI: 55,
    HEI: 58,
    Cd: 60,
    MI: 53,
    CI: 57,
    classification: "Safe",
  },
];

// Badge color map
const getBadgeColor = (classification) => {
  switch (classification) {
    case "Critical":
      return "bg-red-500";
    case "Alert":
      return "bg-orange-400";
    case "Safe":
      return "bg-green-500";
    default:
      return "bg-gray-400";
  }
};

const Overview = ({ analysis }) => {
  let displaySites = [];

  if (analysis) {
    let records = [];
    if (Array.isArray(analysis)) {
      records = analysis;
    } else if (Array.isArray(analysis.results)) {
      records = analysis.results;
    } else if (Array.isArray(analysis.records)) {
      records = analysis.records;
    } else if (Array.isArray(analysis.fullData)) {
      records = analysis.fullData;
    }

    if (records.length > 0) {
      const stateMap = {};
      let totalHPI = 0, totalHEI = 0, totalCd = 0, totalMI = 0, totalCI = 0;

      records.forEach((row) => {
        const hmpiVal = Number(row.HMPI || row.Formula_HMPI || row.ML_Predicted_HMPI || row.HPI || row.hpi || 0);
        const heiVal = Number(row.HEI || row.hei || 0);
        const miVal = Number(row.MI || row.mi || 0);
        const cdVal = Number(row.Cd || row.Cd_Excess || row.cd || 0);
        const ciVal = Number(row.CI || row.Composite_Index || hmpiVal || 0);

        totalHPI += hmpiVal;
        totalHEI += heiVal;
        totalCd += cdVal;
        totalMI += miVal;
        totalCI += ciVal;

        const rawState = row.State || row.state || row.Region || row.region || row.Location || row.location;
        const stateName = rawState ? String(rawState).trim() : "Other Regions";
        if (!stateMap[stateName]) {
          stateMap[stateName] = { count: 0, HPI: 0, HEI: 0, Cd: 0, MI: 0, CI: 0 };
        }
        const st = stateMap[stateName];
        st.count += 1;
        st.HPI += hmpiVal;
        st.HEI += heiVal;
        st.Cd += cdVal;
        st.MI += miVal;
        st.CI += ciVal;
      });

      const count = records.length;
      displaySites.push({
        name: "Overall Dataset Average",
        HPI: (totalHPI / count).toFixed(2),
        HEI: (totalHEI / count).toFixed(2),
        Cd: (totalCd / count).toFixed(2),
        MI: (totalMI / count).toFixed(2),
        CI: Math.min(100, Math.round(totalCI / count)),
        classification: (totalCI / count) > 100 ? "Critical" : (totalCI / count) > 50 ? "Alert" : "Safe"
      });

      Object.entries(stateMap).forEach(([stateName, st]) => {
        if (st.count > 0) {
          const avgCI = st.CI / st.count;
          displaySites.push({
            name: `${stateName} Average`,
            HPI: (st.HPI / st.count).toFixed(2),
            HEI: (st.HEI / st.count).toFixed(2),
            Cd: (st.Cd / st.count).toFixed(2),
            MI: (st.MI / st.count).toFixed(2),
            CI: Math.min(100, Math.round(avgCI)),
            classification: avgCI > 100 ? "Critical" : avgCI > 50 ? "Alert" : "Safe"
          });
        }
      });
    } else {
      const hmpiVal = Number(analysis.Formula_HMPI || analysis.ML_Predicted_HMPI || analysis.HMPI || analysis.HPI || 0);
      const cdVal = Number(
        analysis?.Decoded_Input?.Cd ??
        analysis?.Decoded_Input?.Cd_Excess ??
        analysis.Cd_Excess ??
        analysis.Cd ??
        0
      );
      displaySites = [
        {
          name: analysis?.Decoded_Input?.sample_id || "Submitted Sample",
          HPI: hmpiVal.toFixed(2),
          HEI: Number(analysis.HEI || 0).toFixed(2),
          Cd: cdVal.toFixed(2),
          MI: Number(analysis.MI || 0).toFixed(2),
          CI: Math.min(100, Math.round(Number(analysis.CI || analysis.Formula_HMPI || hmpiVal || 0))),
          classification:
            analysis.Risk_Level === "High Risk" || analysis.Pollution_Status === "High Pollution" || hmpiVal > 100
              ? "Critical"
              : analysis.Risk_Level === "Medium Risk" || analysis.Pollution_Status === "Moderate Pollution" || hmpiVal > 50
                ? "Alert"
                : "Safe",
        }
      ];
    }
  } else {
    displaySites = siteIndices;
  }
  return (
    <div className="card">
      <h2 className="summary-title">
        Overview of Computed Indices & Final Classification
      </h2>
      <p>
        Before diving into visual analytics, the platform provides a concise
        overview of all computed indices and the final classification for each
        sampling site. This summary forms the basis for interpretation by both
        researchers and policymakers.
      </p>

      <div className="features-grid">
        {displaySites.map((site) => (
          <div className="card" key={site.name}>
            <div>
              <div className="flex justify-between items-center w-full">
                <h3 className="text-xl font-semibold text-[#212336] mb-2">
                  {site.name}
                </h3>
                <span
                  className={`text-white text-sm font-semibold px-3 py-1 rounded-full ${getBadgeColor(
                    site.classification
                  )}`}
                >
                  {site.classification}
                </span>
              </div>
              {/* Indices as numbers */}
              <div>
                <div className="card-row">
                  <div className="metric-row-left">
                    <span className="metric-value">HPI : </span>
                    <span className="card-label">
                      Heavy Metal Pollution Index
                    </span>
                  </div>
                  <b>{site.HPI}</b>
                </div>
                <div className="card-row">
                  <div className="metric-row-left">
                    <span className="metric-value">HEI : </span>
                    <span className="card-label">
                      Heavy Metal Evaluation Index
                    </span>
                  </div>
                  <b>{site.HEI}</b>
                </div>
                <div className="card-row">
                  <div className="metric-row-left">
                    <span className="metric-value">Cd : </span>
                    <span className="card-label">Degree of Contamination</span>
                  </div>
                  <b>{site.Cd}</b>
                </div>
                <div className="card-row">
                  <div className="metric-row-left">
                    <span className="metric-value">MI : </span>
                    <span className="card-label">Metal Index</span>
                  </div>
                  <b>{site.MI}</b>
                </div>
              </div>
              {/* Composite Index as progress bar */}
              {/* <div
                style={{ width: "150px", height: "150px", margin: "0 auto" }}
              >
                <CircularProgressbar
                  value={site.CI}
                  text={`${site.CI}%`}
                  styles={buildStyles({
                    textSize: "24px",
                    pathColor: "#2ab97a",
                    textColor: "#333",
                    trailColor: "#eee",
                    strokeWidth: 6,
                  })}
                  width={60}
                />
              </div>
              <p className="font-semibold text-center">
                Composite Index + ML Result
              </p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
