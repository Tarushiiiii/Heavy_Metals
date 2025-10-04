import { useState } from "react";
import { Button } from "../components/ui/button";
import "../components/ui/css/analysis.css";
import {
  ChartLine,
  FileWarning,
  FlaskConical,
  TriangleAlert,
} from "lucide-react";
import { Chart as ChartJs } from "chart.js/auto";
import { Bar, Pie, Line } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);
import Graphs from "../components/graphs/graphs.jsx";

import pieData from "../components/graphs/pieData.json";
import { ExportReport } from "../utils/export"; // adjust path as needed

//Graph dependecies end here

export const Analysis = () => {
  // Tabs state control
  const [activeTab, setActiveTab] = useState("metal-analysis");

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
        <div className="container">
          <div className="results-header">
            <Button
              colorVariant="primary"
              type="main"
              onClickHandler={ExportReport}
            >
              Export Report
            </Button>

            <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded flex items-center gap-2">
              <FileWarning size={24} strokeWidth={1.8} />
              For the privacy concerns we do not store any data on our servers.
              If you wish then click to save your results locally.
            </div>
          </div>

          <div id="report-content">
            {/* Sample Information */}
            <div className="results-card">
              <h2 className="card-title">
                <FlaskConical size={20} strokeWidth={2} />
                Sample Information
              </h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Sample ID</span>
                  <span className="info-value">GW-001</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Coordinates</span>
                  <span className="info-value">40.7128, -74.0060</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Depth</span>
                  <span className="info-value">15.5 m</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Date</span>
                  <span className="info-value">9/10/2025</span>
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
                  <p className="score-value">67.3</p>
                  <p className="score-label">HMPI Score</p>
                </div>
                <div className="hmpi-status">
                  <div className="classification-box moderate">
                    Moderate Pollution
                  </div>
                  <p className="status-subtext">Pollution Classification</p>
                </div>
                <div className="hmpi-risk">
                  <p className="risk-level moderate">
                    <TriangleAlert size={20} strokeWidth={2} />
                    Medium Risk
                  </p>
                </div>
              </div>
              <div className="risk-bar">
                <div className="risk-bar-track">
                  <div
                    className="risk-bar-fill moderate-fill"
                    style={{ width: "67.3%" }}
                  ></div>
                </div>
                <div className="risk-labels">
                  <span>Safe (0-50)</span>
                  <span>Moderate (50-100)</span>
                  <span>High Risk (100+)</span>
                </div>
              </div>
            </div>

            {/* Individual Analysis */}
            {activeTab === "metal-analysis" && (
              <div className="results-card">
                <h2 className="section-title">
                  Individual Heavy Metal Analysis
                </h2>
                <p className="section-subtitle">
                  Detailed breakdown of each heavy metal concentration versus
                  safety limits
                </p>

                <div className="metal-item">
                  <div className="metal-info">
                    <p className="metal-name">Lead (Pb)</p>
                    <p className="metal-value">
                      8.5 <span className="unit">µg/L</span>
                    </p>
                    <p className="metal-limit">Limit: 10 µg/L</p>
                  </div>
                  <div className="metal-graph">
                    <div className="metal-label">85% of safety limit</div>
                    <div className="metal-bar-track">
                      <div
                        className="metal-bar-fill safe-fill"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="metal-status">
                    <span className="status-badge safe">Safe</span>
                  </div>
                </div>

                <div className="metal-item">
                  <div className="metal-info">
                    <p className="metal-name">Cadmium (Cd)</p>
                    <p className="metal-value">
                      3.2 <span className="unit">µg/L</span>
                    </p>
                    <p className="metal-limit">Limit: 5 µg/L</p>
                  </div>
                  <div className="metal-graph">
                    <div className="metal-label">64% of safety limit</div>
                    <div className="metal-bar-track">
                      <div
                        className="metal-bar-fill safe-fill"
                        style={{ width: "64%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="metal-status">
                    <span className="status-badge safe">Safe</span>
                  </div>
                </div>
              </div>
            )}

            {/* Metal Concentration Comparison (Bar Charts) */}
            {activeTab === "metal-analysis" && (
              <div className="results-card">
                <Graphs />
              </div>
            )}

            {/* Heavy Metal Composition (Pie Chart) */}
            {activeTab === "metal-analysis" && (
              <div className="results-card">
                <div className="pie-chart graph-card">
                  <Pie
                    data={{
                      labels: pieData.map((data) => data.label),
                      datasets: [
                        {
                          label: "Percentage",
                          data: pieData.map((data) => data.value),
                          backgroundColor: [
                            "rgb(46, 184, 122)",
                            "rgb(53, 83, 133)",
                            "rgba(225, 255, 187, 1)",
                            "rgb(0, 90, 157)",
                            "rgba(20, 61, 96, 1)",
                            "rgb(0, 117, 121)",
                            "rgba(160, 200, 120, 1)",
                          ],
                          borderColor: "white",
                          borderWidth: 2,
                          hoverOffset: 15,
                          hoverBorderColor: "white",
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      layout: {
                        padding: {
                          right: 0,
                          top: 16,
                          left: 10,
                        },
                      },
                      plugins: {
                        legend: {
                          fullSize: false,
                          align: "end",
                          position: "right",
                          title: {
                            display: true,
                            text: "Legend",
                            color: "black",
                            font: {
                              size: 15,
                              weight: "",
                            },
                            padding: {
                              top: 0,
                              bottom: 3,
                            },
                          },
                          labels: {
                            boxWidth: 20,
                            boxHeight: 15,
                            padding: 6,
                            font: {
                              size: 12,
                            },
                            color: "black",
                          },
                        },
                        title: {
                          display: true,
                          text: "Heavy Metal Composition",
                          color: "black",
                          font: {
                            size: 22,
                            weight: "530",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
