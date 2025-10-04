import { useState } from "react";
import { StatusLegend } from "../components/dashboard/legend";
import { DelhiHeatMap } from "../components/graphs/geoTag";
import { EnhancedGeoTag } from "../components/graphs/enhancedGeoTag";

export const Map = () => {
  // State for tab switching
  const [activeTab, setActiveTab] = useState("standard");

  // Handler for tab switching
  const showTab = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      <div className="main-header-wrapper">
        <div className="main-header">Map Visualization</div>
        <div className="main-text">
          Geotagged heavy metal risk zones across Delhi.
        </div>
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

      {/* Standard */}
      {activeTab === "standard" && (
        <div className="card">
          <div className="card-title">HMPI Based Classification</div>
          <div className="map-status-grid">
            <div className="map-section">
              <DelhiHeatMap />
            </div>
            <div className="legend-section">
              <StatusLegend
                statusLabels={["HMPI < 50", "50 ≤ HMPI < 100", "HMPI ≥ 100"]}
              />
            </div>
          </div>
        </div>
      )}

      {/* Enhanced */}
      {activeTab === "enhanced" && (
        <div className="card">
          <div className="card-title">HMPI Based Classification</div>
          <div className="map-status-grid">
            <div className="map-section">
              <EnhancedGeoTag />
            </div>
            <div className="legend-section">
              <StatusLegend
                statusLabels={[
                  "Safe (CI < 0.5)",
                  "Alert (0.5 ≤ CI < 0.9)",
                  "Critical (CI ≥ 0.9)",
                ]}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
