import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, ArcElement, Legend);

import defaultBarData from "./barData.json";
import defaultBarData2 from "./barData2.json";
import defaultMetalConc from "./metalConc.js";

const WHO_LIMITS = {
  Pb: { name: "Lead (Pb)", limit: 0.01 },
  Cd: { name: "Cadmium (Cd)", limit: 0.003 },
  Cr: { name: "Chromium (Cr)", limit: 0.05 },
  As: { name: "Arsenic (As)", limit: 0.01 },
  Zn: { name: "Zinc (Zn)", limit: 3.0 },
  Fe: { name: "Iron (Fe)", limit: 0.3 },
  Cu: { name: "Copper (Cu)", limit: 2.0 },
  Ni: { name: "Nickel (Ni)", limit: 0.07 },
  Mn: { name: "Manganese (Mn)", limit: 0.4 },
  Hg: { name: "Mercury (Hg)", limit: 0.006 },
  Se: { name: "Selenium (Se)", limit: 0.04 },
};

const extractIndividualMetals = (rawAnalysis) => {
  if (!rawAnalysis) return null;

  let records = [];
  if (Array.isArray(rawAnalysis)) {
    records = rawAnalysis;
  } else if (Array.isArray(rawAnalysis.results)) {
    records = rawAnalysis.results;
  } else if (rawAnalysis.Decoded_Input) {
    records = [rawAnalysis.Decoded_Input];
  } else if (typeof rawAnalysis === "object") {
    records = [rawAnalysis];
  }

  if (records.length === 0) return null;

  const regionsMap = {};
  records.forEach((r) => {
    const reg = r.State || r.state || r.Region || r.region || r.Location || r.location;
    const regName = reg ? String(reg).trim() : "Overall";
    if (!regionsMap[regName]) {
      regionsMap[regName] = [];
    }
    regionsMap[regName].push(r);
  });

  const availableRegions = Object.keys(regionsMap).filter((r) => r !== "Overall" && r !== "Unknown Region");

  const result = [];

  Object.entries(WHO_LIMITS).forEach(([key, info]) => {
    // 1. Overall Averages
    let overallTotal = 0;
    let overallCount = 0;
    records.forEach((r) => {
      const val =
        r[key] ??
        r[`${key}_mgL`] ??
        r[info.name] ??
        (r.Decoded_Input && r.Decoded_Input[key]);
      if (val !== undefined && val !== null && !isNaN(val)) {
        overallTotal += Number(val);
        overallCount += 1;
      }
    });

    const overallAvg = overallCount > 0 ? Number((overallTotal / overallCount).toFixed(4)) : 0;

    // 2. Region-specific values
    const regionValues = Object.entries(regionsMap)
      .filter(([regName]) => regName !== "Overall")
      .map(([regName, regRecords]) => {
        let regTotal = 0;
        let regCount = 0;
        regRecords.forEach((r) => {
          const val =
            r[key] ??
            r[`${key}_mgL`] ??
            r[info.name] ??
            (r.Decoded_Input && r.Decoded_Input[key]);
          if (val !== undefined && val !== null && !isNaN(val)) {
            regTotal += Number(val);
            regCount += 1;
          }
        });
        const avgVal = regCount > 0 ? Number((regTotal / regCount).toFixed(4)) : 0;
        return {
          region: regName,
          val: avgVal,
          exceeds: avgVal > info.limit,
        };
      });

    result.push({
      key,
      name: info.name,
      overallAvg,
      limit: info.limit,
      exceeds: overallAvg > info.limit,
      ratio: Number((overallAvg / info.limit).toFixed(2)),
      regionValues,
    });
  });

  return {
    metals: result,
    availableRegions,
    sampleCount: records.length,
  };
};

const Graphs = ({ chartProps, rawAnalysis }) => {
  const parsed = useMemo(() => extractIndividualMetals(rawAnalysis), [rawAnalysis]);

  const dynamicMetals = parsed?.metals;
  const availableRegions = parsed?.availableRegions || [];

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, grid: { color: "rgba(0,0,0,0.05)" } },
    },
  };

  const miniBarOptions = {
    responsive: true,
    maintainAspectRatio: 1,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, grid: { display: false } },
    },
  };

  // If dynamic metal analysis is available from prediction
  if (dynamicMetals && dynamicMetals.length > 0) {
    return (
      <div className="space-y-6">
        {/* Individual Metal Grid with Multi-Region Side-by-Side comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 graph-card p-4">
          {dynamicMetals.map((metal) => {
            const isMultiRegion = metal.regionValues.length > 1 && availableRegions.length > 0;

            const labels = isMultiRegion
              ? [...metal.regionValues.map((r) => r.region), "WHO Limit"]
              : ["Measured", "WHO Limit"];

            const dataValues = isMultiRegion
              ? [...metal.regionValues.map((r) => r.val), metal.limit]
              : [metal.overallAvg, metal.limit];

            const barColors = isMultiRegion
              ? [
                ...metal.regionValues.map((r) =>
                  r.exceeds ? "rgba(239, 68, 68, 0.85)" : "rgba(42, 185, 122, 0.85)"
                ),
                "rgba(53, 83, 132, 0.5)",
              ]
              : [
                metal.exceeds ? "rgba(239, 68, 68, 0.85)" : "rgba(42, 185, 122, 0.85)",
                "rgba(53, 83, 132, 0.5)",
              ];

            const data = {
              labels,
              datasets: [
                {
                  label: metal.name,
                  data: dataValues,
                  backgroundColor: barColors,
                  borderRadius: 4,
                },
              ],
            };

            return (
              <div key={metal.key} className="p-3 border rounded-lg bg-white shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-bold text-gray-800">
                    {metal.name}
                  </h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-semibold text-white ${metal.exceeds ? "bg-red-500" : "bg-green-600"
                      }`}
                  >
                    {metal.exceeds ? `Exceeds (${metal.ratio}x)` : "Safe"}
                  </span>
                </div>

                <div className="h-44 w-full">
                  <Bar data={data} options={miniBarOptions} />
                </div>

                <div className="mt-2 text-xs text-gray-600 flex flex-col gap-1 border-t pt-2">
                  <div className="flex justify-between">
                    <span>Overall Average: <b>{metal.overallAvg} mg/L</b></span>
                    <span>WHO Limit: <b>{metal.limit} mg/L</b></span>
                  </div>
                  {isMultiRegion && (
                    <div className="text-[10px] text-gray-400 mt-1 max-h-16 overflow-y-auto">
                      Region values: {metal.regionValues.map(r => `${r.region}: ${r.val} mg/L`).join(" | ")}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Fallback default view
  return (
    <div className="space-y-0">
      <div className="grid grid-cols-3 gap-6 h-full graph-card">
        {defaultMetalConc.map((graph, index) => {
          const data = {
            labels: graph.labels,
            datasets: [
              {
                label: graph.title,
                data: graph.data,
                backgroundColor: ["#355384", "#2ab97a", "#9ada80"],
                barPercentage: 0.6,
                categoryPercentage: 0.55,
                borderRadius: 3,
              },
            ],
          };

          return (
            <div key={index} className="p-1 h-full flex flex-col">
              <h3 className="text-sm font-semibold mb-1 text-center">
                {graph.title}
              </h3>
              <div className="h-full w-full">
                <Bar data={data} options={miniBarOptions} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Graphs;


