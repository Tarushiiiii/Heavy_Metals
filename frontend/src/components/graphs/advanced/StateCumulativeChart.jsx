import React, { useState, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Building2, Layers, MapPin } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const parseStateData = (records) => {
  if (!Array.isArray(records) || records.length === 0) return null;

  const stateMap = {};

  records.forEach((row) => {
    const rawState =
      row.State || row.state || row.Region || row.region || row.Location || row.location;
    const stateName = rawState ? String(rawState).trim() : "Unknown Region";

    if (!stateMap[stateName]) {
      stateMap[stateName] = {
        name: stateName,
        count: 0,
        totalHMPI: 0,
        totalHEI: 0,
        totalCd: 0,
        totalMI: 0,
        totalCI: 0,
        metals: { Fe: 0, As: 0, Pb: 0, Cd: 0, Cr: 0, Hg: 0, Ni: 0, Cu: 0, Zn: 0, Mn: 0, Se: 0 },
      };
    }

    const st = stateMap[stateName];
    st.count += 1;
    st.totalHMPI += Number(row.HMPI || row.Formula_HMPI || row.HPI || 0);
    st.totalHEI += Number(row.HEI || 0);
    st.totalCd += Number(row.Cd || row.Cd_Excess || 0);
    st.totalMI += Number(row.MI || 0);
    st.totalCI += Number(row.Composite_Index || row.CI || 0);

    const metalKeys = ["Fe", "As", "Pb", "Cd", "Cr", "Hg", "Ni", "Cu", "Zn", "Mn", "Se"];
    metalKeys.forEach((m) => {
      const val =
        row[m] ??
        row[`${m}_mgL`] ??
        row[`${m} (PPM)`] ??
        (row.Decoded_Input && row.Decoded_Input[m]);
      if (val !== undefined && val !== null) {
        st.metals[m] += Number(val) || 0;
      }
    });
  });

  const stateNames = Object.keys(stateMap);
  const stateAverages = stateNames.map((name) => {
    const st = stateMap[name];
    const avgMetals = {};
    Object.keys(st.metals).forEach((m) => {
      avgMetals[m] = Number((st.metals[m] / st.count).toFixed(4));
    });

    const avgHMPI = Number((st.totalHMPI / st.count).toFixed(2));
    const avgCI = Number((st.totalCI / st.count).toFixed(2));
    let status = "Safe";
    if (avgHMPI > 100 || avgCI > 100) status = "Critical";
    else if (avgHMPI > 50 || avgCI > 50) status = "Moderate";

    // Find dominant metal
    const sortedMetals = Object.entries(avgMetals)
      .sort((a, b) => b[1] - a[1]);
    const dominantMetal = sortedMetals.length > 0 ? sortedMetals[0][0] : "N/A";

    return {
      name: st.name,
      sampleCount: st.count,
      avgHMPI,
      avgHEI: Number((st.totalHEI / st.count).toFixed(2)),
      avgCd: Number((st.totalCd / st.count).toFixed(2)),
      avgMI: Number((st.totalMI / st.count).toFixed(2)),
      avgCI,
      status,
      dominantMetal,
      metals: avgMetals,
    };
  });

  return { stateNames, stateAverages };
};

export default function StateCumulativeChart({ rawData }) {
  const [selectedState, setSelectedState] = useState("ALL");

  const parsed = useMemo(() => {
    if (!rawData) return null;

    let records = [];
    if (Array.isArray(rawData)) {
      records = rawData;
    } else if (Array.isArray(rawData.results)) {
      records = rawData.results;
    } else if (Array.isArray(rawData.records)) {
      records = rawData.records;
    } else if (rawData.Decoded_Input && (rawData.Decoded_Input.State || rawData.Decoded_Input.state)) {
      records = [{ ...rawData.Decoded_Input, HMPI: rawData.Formula_HMPI, HEI: rawData.HEI, Cd: rawData.Cd_Excess, MI: rawData.MI, CI: rawData.CI }];
    }

    return parseStateData(records);
  }, [rawData]);

  if (!parsed || parsed.stateAverages.length === 0) {
    return null;
  }

  const { stateNames, stateAverages } = parsed;

  const filteredStates = selectedState === "ALL"
    ? stateAverages
    : stateAverages.filter((s) => s.name === selectedState);

  // HMPI by State Chart Data
  const hmpiChartData = {
    labels: filteredStates.map((s) => s.name),
    datasets: [
      {
        label: "Cumulative Avg HMPI",
        data: filteredStates.map((s) => s.avgHMPI),
        backgroundColor: "rgba(53, 83, 132, 0.85)",
        borderRadius: 4,
      },
      {
        label: "Composite Index (CI)",
        data: filteredStates.map((s) => s.avgCI),
        backgroundColor: "rgba(42, 185, 122, 0.85)",
        borderRadius: 4,
      },
      {
        label: "Heavy Metal Evaluation (HEI)",
        data: filteredStates.map((s) => s.avgHEI),
        backgroundColor: "rgba(240, 140, 60, 0.85)",
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Cumulative HMPI & Indices by State",
        font: { size: 16, weight: "bold" },
        color: "#111",
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, grid: { color: "rgba(0,0,0,0.05)" } },
    },
  };

  return (
    <div className="card mt-6">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <div>
          <h2 className="section-title text-2xl flex items-center gap-2">
            <Building2 size={24} className="text-blue-600" />
            Cumulative State Analysis
          </h2>
          <p className="section-subtitle">
            Aggregated heavy metal contamination indices grouped by State
          </p>
        </div>

        {stateNames.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">Filter State:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="custom-select py-1.5 px-3 border rounded text-sm bg-white shadow-sm"
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

      {/* Main Bar Chart */}
      <div className="graph-card" style={{ height: "380px", marginBottom: "1.5rem", padding: "1rem" }}>
        <Bar data={hmpiChartData} options={chartOptions} />
      </div>

      {/* State Summary Cards Grid */}
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800">
        <Layers size={20} />
        State-Wise Cumulative Metrics & Severity
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStates.map((st) => (
          <div key={st.name} className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-gray-900 text-lg flex items-center gap-1.5">
                <MapPin size={18} className="text-red-500" />
                {st.name}
              </h4>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold text-white ${
                  st.status === "Critical"
                    ? "bg-red-600"
                    : st.status === "Moderate"
                    ? "bg-amber-500"
                    : "bg-emerald-600"
                }`}
              >
                {st.status}
              </span>
            </div>

            <div className="text-xs text-gray-500 mb-3">
              Total Samples Analyzed: <span className="font-semibold text-gray-700">{st.sampleCount}</span>
            </div>

            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">Avg HMPI:</span>
                <span className="font-semibold text-gray-900">{st.avgHMPI}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">Avg HEI:</span>
                <span className="font-semibold text-gray-900">{st.avgHEI}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">Degree of Contamination (Cd):</span>
                <span className="font-semibold text-gray-900">{st.avgCd}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">Metal Index (MI):</span>
                <span className="font-semibold text-gray-900">{st.avgMI}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-gray-600">Dominant Metal:</span>
                <span className="font-bold text-blue-700">{st.dominantMetal}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
