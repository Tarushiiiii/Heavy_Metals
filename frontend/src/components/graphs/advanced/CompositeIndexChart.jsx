import React, { useMemo, useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import { Compass } from "lucide-react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
);

function normalizeComposite(input) {
  if (!input) return null;

  // 1. If already the expected shape { labels: [...], series: [{ name, data: [...] }] }
  if (Array.isArray(input.labels) && Array.isArray(input.series) && input.series.length > 0) {
    return input;
  }

  // 2. Extract bulk dataset records array if available
  let records = [];
  if (Array.isArray(input)) {
    records = input;
  } else if (Array.isArray(input.results)) {
    records = input.results;
  } else if (Array.isArray(input.records)) {
    records = input.records;
  } else if (Array.isArray(input.fullData)) {
    records = input.fullData;
  }

  if (records.length > 0) {
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

    return {
      labels: ["HMPI", "HEI", "MI", "Cd"],
      series,
    };
  }

  // 3. Single sample object fallback (flexible key checking)
  const hmpi =
    input.Formula_HMPI ??
    input.ML_Predicted_HMPI ??
    input.HMPI ??
    input.HPI ??
    input.hpi;

  const hei = input.HEI ?? input.hei;
  const mi = input.MI ?? input.mi;
  const cd =
    input?.Decoded_Input?.Cd ??
    input?.Decoded_Input?.Cd_Excess ??
    input.Cd_Excess ??
    input.Cd ??
    input.cd;

  if (hmpi !== undefined || hei !== undefined || mi !== undefined || cd !== undefined) {
    return {
      labels: ["HMPI", "HEI", "MI", "Cd"],
      series: [
        {
          name: input?.Decoded_Input?.sample_id || "Submitted Sample",
          data: [
            Number(hmpi || 0),
            Number(hei || 0),
            Number(mi || 0),
            Number(cd || 0),
          ],
        },
      ],
    };
  }

  // 4. Object with direct numeric properties
  if (typeof input === "object") {
    const numericEntries = Object.entries(input).filter(
      ([k, v]) => (typeof v === "number" || (!isNaN(v) && v !== "")) && typeof v !== "boolean"
    );

    if (numericEntries.length >= 2) {
      const sliced = numericEntries.slice(0, 4);
      return {
        labels: sliced.map(([k]) => k),
        series: [
          {
            name: "Submitted Sample",
            data: sliced.map(([, v]) => Number(v)),
          },
        ],
      };
    }
  }

  return null;
}

const chooseColor = (i) => {
  const baseColors = [
    "53,83,132",
    "42,185,122",
    "240,140,60",
    "239,68,68",
    "180,140,220",
    "59,130,246",
  ];
  return baseColors[i % baseColors.length];
};

const buildChartData = (compositeDataNormalized, selectedState = "ALL") => {
  if (!compositeDataNormalized) return null;

  const labels = compositeDataNormalized.labels || [];
  const series = compositeDataNormalized.series || [];

  const datasets = series
    .map((s, i) => ({ s, originalIndex: i }))
    .filter(({ s }) => selectedState === "ALL" || s.name === selectedState)
    .map(({ s, originalIndex }) => {
      let data = s.data;
      if (!Array.isArray(data)) {
        data = labels.map(() => 0);
      }

      if (data.length < labels.length) {
        data = data.concat(new Array(labels.length - data.length).fill(0));
      } else if (data.length > labels.length) {
        data = data.slice(0, labels.length);
      }

      const c = chooseColor(originalIndex);
      return {
        label: s.name || `Series ${originalIndex + 1}`,
        data,
        backgroundColor: `rgba(${c}, 0.25)`,
        borderColor: `rgba(${c}, 1)`,
        borderWidth: 2,
        pointBackgroundColor: `rgba(${c}, 1)`,
      };
    });

  return { labels, datasets };
};

const CompositeIndexChart = ({ compositeData }) => {
  // debug - helps you see what arrives in props (remove in production)
  // eslint-disable-next-line no-console
  console.debug("CompositeIndexChart: received compositeData:", compositeData);

  const [selectedState, setSelectedState] = useState("ALL");

  // normalize and memoize to avoid unnecessary recalcs
  const normalized = useMemo(() => normalizeComposite(compositeData), [compositeData]);

  // Extract available states dynamically
  const stateNames = useMemo(() => {
    if (!normalized || !normalized.series) return [];
    return normalized.series.map((s) => s.name).filter(Boolean);
  }, [normalized]);

  // Auto-reset state filter if it doesn't exist in new dataset
  useEffect(() => {
    if (selectedState !== "ALL" && !stateNames.includes(selectedState)) {
      setSelectedState("ALL");
    }
  }, [stateNames, selectedState]);

  // build chartData
  const chartData = useMemo(() => buildChartData(normalized, selectedState), [normalized, selectedState]);

  // Dynamically calculate the maximum value to avoid scale squash or clipping
  const maxVal = useMemo(() => {
    if (!chartData || !chartData.datasets) return 100;
    let highest = 100;
    chartData.datasets.forEach((ds) => {
      if (Array.isArray(ds.data)) {
        ds.data.forEach((val) => {
          if (val && !isNaN(val) && val > highest) {
            highest = val;
          }
        });
      }
    });
    return Math.ceil(highest / 20) * 20;
  }, [chartData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 13 },
          color: "#000",
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: maxVal,
        ticks: {
          stepSize: 20,
          color: "#444",
        },
        pointLabels: {
          color: "#111",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        grid: {
          color: "rgba(0,0,0,0.1)",
        },
        angleLines: {
          color: "rgba(0,0,0,0.1)",
        },
      },
    },
  };

  if (!chartData || !chartData.datasets || chartData.datasets.length === 0) {
    return (
      <div className="graph-card" style={{ height: "300px", padding: "1rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <strong>Composite Index</strong>
          <p style={{ margin: 0, color: "#666" }}>
            No composite data available yet. Provide an analysis payload or use
            the Calculate → View Detailed Report flow.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="graph-card" style={{ height: "500px", padding: "1.2rem 1rem", display: "flex", flexDirection: "column" }}>
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Compass size={22} className="text-blue-600" />
            Composite Index Comparison
          </h3>
          <p className="text-xs text-gray-500" style={{ margin: 0 }}>
            Radar chart comparing HMPI, HEI, MI, and Cd
          </p>
        </div>

        {stateNames.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">Filter State:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="custom-select py-1.5 px-3 border rounded text-sm bg-white shadow-sm"
              style={{ height: "auto" }}
            >
              <option value="ALL">All States ({stateNames.length})</option>
              {stateNames.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
        <Radar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CompositeIndexChart;
