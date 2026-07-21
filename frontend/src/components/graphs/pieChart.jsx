import React, { useMemo, useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { PieChart as PieIcon } from "lucide-react"; // Import pie chart icon
import ChartDataLabels from "chartjs-plugin-datalabels"; // ✅ Import plugin
import pieData from "./pieData.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title); 

const METALS_LIST = ["Pb", "Cd", "Cr", "As", "Zn", "Fe", "Cu", "Ni", "Mn", "Hg", "Se"];

const getPieDataForState = (records, selectedState) => {
  if (!Array.isArray(records) || records.length === 0) return [];

  const filteredRecords = selectedState === "ALL" 
    ? records 
    : records.filter((row) => {
        const rawState = row.State || row.state || row.Region || row.region || row.Location || row.location;
        return rawState && String(rawState).trim() === selectedState;
      });

  if (filteredRecords.length === 0) return [];

  const sums = {};
  const counts = {};
  METALS_LIST.forEach((m) => {
    sums[m] = 0;
    counts[m] = 0;
  });

  filteredRecords.forEach((row) => {
    METALS_LIST.forEach((m) => {
      const val = row[m] ?? row[`${m}_mgL`] ?? (row.Decoded_Input && row.Decoded_Input[m]);
      if (val !== undefined && val !== null && !isNaN(val)) {
        sums[m] += Number(val);
        counts[m] += 1;
      }
    });
  });

  const list = [];
  METALS_LIST.forEach((m) => {
    if (counts[m] > 0) {
      list.push({ label: m, value: Number((sums[m] / counts[m]).toFixed(4)) });
    }
  });

  return list;
};

const PieChart = ({ data, rawData }) => {
  const [selectedState, setSelectedState] = useState("ALL");

  // Group records if bulk
  const parsedRecords = useMemo(() => {
    if (!rawData) return null;
    let records = [];
    if (Array.isArray(rawData)) {
      records = rawData;
    } else if (Array.isArray(rawData.results)) {
      records = rawData.results;
    } else if (Array.isArray(rawData.records)) {
      records = rawData.records;
    } else if (Array.isArray(rawData.fullData)) {
      records = rawData.fullData;
    }
    return records;
  }, [rawData]);

  const stateNames = useMemo(() => {
    if (!parsedRecords || parsedRecords.length === 0) return [];
    const names = new Set();
    parsedRecords.forEach((row) => {
      const rawState = row.State || row.state || row.Region || row.region || row.Location || row.location;
      if (rawState) names.add(String(rawState).trim());
    });
    return Array.from(names).filter(Boolean);
  }, [parsedRecords]);

  // Auto-reset state filter if it doesn't exist in new dataset
  useEffect(() => {
    if (selectedState !== "ALL" && !stateNames.includes(selectedState)) {
      setSelectedState("ALL");
    }
  }, [stateNames, selectedState]);

  const displayData = useMemo(() => {
    if (parsedRecords && parsedRecords.length > 0) {
      const computed = getPieDataForState(parsedRecords, selectedState);
      if (computed.length > 0) return computed;
    }
    return data || pieData || [];
  }, [parsedRecords, selectedState, data]);

  const chartData = {
    labels: displayData.map((d) => d.label),
    datasets: [
      {
        label: "Percentage",
        data: displayData.map((d) => d.value),
        backgroundColor: [
          "rgba(46, 184, 122, 0.85)",   // Tealish Green
          "rgba(53, 83, 133, 0.85)",   // Blue
          "rgba(240, 140, 60, 0.85)",   // Orange
          "rgba(239, 68, 68, 0.85)",    // Red
          "rgba(180, 140, 220, 0.85)",  // Purple
          "rgba(59, 130, 246, 0.85)",   // Light Blue
          "rgba(16, 185, 129, 0.85)",   // Emerald
          "rgba(245, 158, 11, 0.85)",   // Amber
          "rgba(99, 102, 241, 0.85)",   // Indigo
          "rgba(236, 72, 153, 0.85)",   // Pink
          "rgba(107, 114, 128, 0.85)",  // Gray
        ],
        borderColor: "white",
        borderWidth: 2,
        hoverOffset: 15,
        hoverBorderColor: "white",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {},
    plugins: {
      legend: {
        position: "right",
        align: "center",
        labels: {
          boxWidth: 25,
          boxHeight: 20,
          font: { size: 12 },
          color: "black",
          padding: 14,
        },
      },
      title: {
        display: false,
      },
      datalabels: {
        color: "white",
        font: {
          weight: "bold",
          size: 14,
        },
        formatter: (value, context) => {
          const total = context.chart._metasets[0].total || 
                        context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          if (total === 0) return "0%";
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
      },
    },
  };

  if (!displayData || displayData.length === 0) {
    return (
      <div className="graph-card" style={{ height: "300px", padding: "1rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <strong>Heavy Metal Composition</strong>
          <p style={{ margin: 0, color: "#666" }}>
            No pie chart data available.
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
            <PieIcon size={22} className="text-blue-600" />
            Heavy Metal Composition
          </h3>
          <p className="text-xs text-gray-500" style={{ margin: 0 }}>
            Cumulative % distribution of measured heavy metals
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
        <Pie data={chartData} options={options} plugins={[ChartDataLabels]} />
      </div>
    </div>
  );
};

export default PieChart;
