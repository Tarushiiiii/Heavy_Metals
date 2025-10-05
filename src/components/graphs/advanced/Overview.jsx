import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Example dataset — replace with actual computed values if available
const siteIndices = [
  {
    name: "Site 1",
    HPI: 68,
    HEI: 72,
    Cd: 65,
    MI: 70,
    CI: 75,
    classification: "Critical",
  },
  {
    name: "Site 2",
    HPI: 55,
    HEI: 50,
    Cd: 48,
    MI: 53,
    CI: 56,
    classification: "Alert",
  },
  {
    name: "Site 3",
    HPI: 35,
    HEI: 38,
    Cd: 30,
    MI: 33,
    CI: 36,
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

const Overview = () => {
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
        {siteIndices.map((site) => (
          <div key={site.name}>
            <div className="flex justify-between items-center w-full">
              <h3 className="text-lg font-semibold text-[#212336]">
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
            <div className="card">
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
            <div className="card">
              <CircularProgressbar
                value={site.CI}
                text={`${site.CI}%`}
                styles={buildStyles({
                  textSize: "20px",
                  pathColor: "#2ab97a",
                  textColor: "#333",
                  trailColor: "#eee",
                  strokeWidth: 6,
                })}
                width={60}
              />
            </div>
            <p className="font-semibold text-center">Composite Index + ML</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
