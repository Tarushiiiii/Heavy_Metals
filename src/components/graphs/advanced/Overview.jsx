import React from "react";
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
    classification: "Moderate",
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
    case "Moderate":
      return "bg-orange-400";
    case "Safe":
      return "bg-green-500";
    default:
      return "bg-gray-400";
  }
};

const Overview = () => {
  return (
    <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
      <h2 className="text-2xl font-semibold mb-4 text-center text-[#355384]">
        Overview of Computed Indices & Final Classification
      </h2>
      <p className="text-gray-700 text-sm text-center max-w-3xl mx-auto mb-6">
        Before diving into visual analytics, the platform provides a concise overview of
        all computed indices and the final classification for each sampling site.  
        This summary forms the basis for interpretation by both researchers and policymakers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {siteIndices.map((site) => (
    <div
      key={site.name}
      className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-all duration-200"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-[#355384]">{site.name}</h3>
        <span
          className={`text-white text-sm font-semibold px-3 py-1 rounded-full ${getBadgeColor(
            site.classification
          )}`}
        >
          {site.classification}
        </span>
      </div>

      {/* Indices as numbers */}
      <div className="space-y-2 mt-2">
        <p className="text-gray-700 font-medium">HPI: {site.HPI}</p>
        <p className="text-gray-700 font-medium">HEI: {site.HEI}</p>
        <p className="text-gray-700 font-medium">Cd: {site.Cd}</p>
        <p className="text-gray-700 font-medium">MI: {site.MI}</p>
      </div>

      {/* Composite Index as progress bar */}
      <div className="mt-4">
        <CircularProgressbar
          value={site.CI}
          text={`${site.CI}%`}
          styles={buildStyles({
            textSize: "28px",
            pathColor: "#2ab97a", // color can vary by classification if needed
            textColor: "#333",
            trailColor: "#eee",
          })}
        />
        <p className="mt-2 text-center font-semibold text-gray-600">
          Composite Index + ML
        </p>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default Overview;
