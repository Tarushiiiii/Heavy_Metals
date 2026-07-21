import { useState, useMemo } from "react";
import axios from "axios";
import {
  UploadCloud,
  CheckCircle2,
  Trash2,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { StatusLegend } from "../components/dashboard/legend";
import { HeatMap } from "../components/graphs/geoTag";
import { EnhancedGeoTag } from "../components/graphs/enhancedGeoTag";
import { useReportStore } from "../store/reportStore";
import { formatUploadedRecordsToReports } from "../utils/functions/utility";

export const Map = () => {
  const [activeTab, setActiveTab] = useState("standard");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const reports = useReportStore((state) => state.reports || []);
  const setReports = useReportStore((state) => state.setReports);

  const showTab = (tabId) => {
    setActiveTab(tabId);
  };

  const mapConfig = useMemo(() => {
    if (reports.length === 0) {
      return { center: { lat: 28.7041, lng: 77.1025 }, zoom: 10 };
    }
    let sumLat = 0;
    let sumLng = 0;
    let validCount = 0;
    reports.forEach((p) => {
      if (p.lat && p.lng) {
        sumLat += p.lat;
        sumLng += p.lng;
        validCount++;
      }
    });
    if (validCount === 0) {
      return { center: { lat: 28.7041, lng: 77.1025 }, zoom: 10 };
    }
    return {
      center: { lat: sumLat / validCount, lng: sumLng / validCount },
      zoom: 11,
    };
  }, [reports]);

  const activeDataStandard = useMemo(() => {
    return reports.map((p) => ({
      ...p,
      status: p.hpi >= 100 ? "Critical" : p.hpi >= 50 ? "Alert" : "Safe"
    }));
  }, [reports]);

  const activeDataEnhanced = useMemo(() => {
    return reports.map((p) => ({
      ...p,
      status: p.ci >= 0.9 ? "Critical" : p.ci >= 0.5 ? "Alert" : "Safe"
    }));
  }, [reports]);

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError("");
    setFileName(file.name);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const BASE_URL =
        window.location.hostname === "localhost"
          ? "http://127.0.0.1:8000"
          : (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000");

      const response = await axios.post(`${BASE_URL}/pipeline/run`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.status && response.data.status !== "success") {
        setError(response.data.message || "Failed to process the dataset on backend.");
        setLoading(false);
        return;
      }

      const results = response.data.results || [];
      if (results.length === 0) {
        setError("No sample rows detected in the uploaded dataset.");
        setLoading(false);
        return;
      }

      const mapped = formatUploadedRecordsToReports(results);
      setReports(mapped);
    } catch (err) {
      console.error(err);
      setError("An error occurred while uploading or processing the file. Please check column headers and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setReports([]);
    setFileName("");
    setError("");
  };

  return (
    <div>
      <div className="main-header-wrapper">
        <div className="main-header">Map Visualization</div>
        <div className="main-text">
          Geotagged heavy metal risk zones across Delhi.
        </div>
      </div>

      <div className="card mb-6 p-6 rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md mx-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-teal-800 flex items-center gap-2">
              <UploadCloud size={20} className="text-teal-600 animate-pulse" />
              Visualize Custom Water Quality Dataset
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Upload a CSV or Excel file containing Lat/Lng coordinates and heavy metal parameters to generate real-time geotagging visualizations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {reports.length > 0 && (
              <div className="flex items-center gap-2">
                <button
                  className="btn bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 py-1.5 px-3 rounded-lg text-sm transition-all flex items-center gap-1.5"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid #ef4444",
                    color: "#ef4444",
                    padding: "8px 16px",
                    fontWeight: "600"
                  }}
                  onClick={handleReset}
                  title="Clear uploaded dataset"
                >
                  <Trash2 size={16} />
                  Reset
                </button>
              </div>
            )}

            {reports.length === 0 && (
              <label
                className="btn bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-5 rounded-lg text-sm cursor-pointer shadow-sm hover:shadow transition-all flex items-center gap-2"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontWeight: "600"
                }}
              >
                <UploadCloud size={16} />
                <span>Upload CSV / Excel</span>
                <input
                  type="file"
                  accept=".csv, .xlsx, .xls"
                  onChange={handleFileUpload}
                  className="hidden"
                  style={{ display: "none" }}
                />
              </label>
            )}
          </div>
        </div>

        {loading && (
          <div className="mt-4 flex items-center gap-3 p-4 bg-teal-50 border border-teal-100 text-teal-800 rounded-lg text-sm animate-pulse">
            <RefreshCw size={18} className="animate-spin text-teal-600" />
            <span>Analyzing dataset and running heavy metal index pipeline... Please wait.</span>
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-center gap-2.5 p-4 bg-red-50 border border-red-100 text-red-700 rounded-lg text-sm">
            <AlertTriangle size={18} className="text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {reports.length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 border border-gray-100 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-4 text-xs md:text-sm">
            <div className="flex flex-col gap-0.5">
              <span className="text-gray-400 font-semibold uppercase tracking-wider text-[10px]">Dataset Name</span>
              <span className="font-semibold text-gray-700 truncate">{fileName || "Uploaded Dataset"}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-gray-400 font-semibold uppercase tracking-wider text-[10px]">Total Samples</span>
              <span className="font-bold text-teal-600">{reports.length} points</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-gray-400 font-semibold uppercase tracking-wider text-[10px]">Avg HPI</span>
              <span className="font-bold text-gray-700">
                {(reports.reduce((acc, p) => acc + p.hpi, 0) / reports.length).toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-gray-400 font-semibold uppercase tracking-wider text-[10px]">Active View</span>
              <span className="font-semibold text-teal-600 flex items-center gap-1">
                <CheckCircle2 size={14} /> Custom Dataset
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === "standard" ? "active" : ""}`}
          onClick={() => showTab("standard")}
        >
          Standard
        </button>
        <button
          className={`tab-btn ${activeTab === "enhanced" ? "active" : ""}`}
          onClick={() => showTab("enhanced")}
        >
          Enhanced
        </button>
      </div>

      {activeTab === "standard" && (
        <div className="card">
          <div className="card-title">HPI Based Classification</div>
          <div className="map-status-grid">
            <div className="map-section">
              <HeatMap data={activeDataStandard} center={mapConfig.center} zoom={mapConfig.zoom} />
            </div>
            <div className="legend-section">
              <StatusLegend
                statusLabels={["HPI < 50", "50 ≤ HPI < 100", "HPI ≥ 100"]}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === "enhanced" && (
        <div className="card">
          <div className="card-title">Enhanced Classification</div>
          <div className="map-status-grid">
            <div className="map-section">
              <EnhancedGeoTag data={activeDataEnhanced} center={mapConfig.center} zoom={mapConfig.zoom} />
            </div>
            <div className="legend-section">
              <StatusLegend
                statusLabels={[
                  "Unified Value < 0.5",
                  "0.5 ≤ Unified Value < 0.9",
                  "Unified Value ≥ 0.9",
                ]}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
