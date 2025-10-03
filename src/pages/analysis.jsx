import { useState } from "react";
import { Button } from "../components/ui/button";
import "../components/ui/css/analysis.css";
import { FileWarning } from "lucide-react";
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
    Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, ArcElement, Legend);
import Graphs from "../components/graphs/graphs.jsx";

import pieData from "../components/graphs/pieData.json";

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
                onClickHandler={() => {}}
              >
                Export Report
              </Button>
              <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded flex items-center gap-2">
                <FileWarning size={24} strokeWidth={1.8} />
                For the privacy concerns we do not store any data on our
                servers. If you wish then click to save your results locally.
              </div>
            </div>

            <div className="results-card">
              <h2 className="card-title">
                <i className="fas fa-map-marker-alt"></i> Sample Information
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

            <div className="results-card">
              <h2 className="card-title">
                <i className="fas fa-chart-line"></i> HMPI Assessment
              </h2>
              <div className="hmpi-assessment">
                <div className="hmpi-score">
                  <p className="score-value">67.3</p>
                  <p className="score-label">HMPI Score</p>
                </div>
                <div className="hmpi-status">
                  <div className="status-badge elevated">
                    Moderate Pollution
                  </div>
                  <p className="status-subtext">Pollution Classification</p>
                </div>
                <div className="hmpi-risk">
                  <div className="risk-icon-box">
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                  <p className="risk-level">Medium Risk</p>
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
            {/* 
                    <div className="tab-options">
                        <button
                            className={`tab-btn ${activeTab === "metal-analysis" ? "active" : ""}`}
                            onClick={() => setActiveTab("metal-analysis")}
                        >
                            Metal Analysis
                        </button>
                        <button
                            className={`tab-btn ${activeTab === "recommendations-section" ? "active" : ""}`}
                            onClick={() => setActiveTab("recommendations-section")}
                        >
                            Recommendations
                        </button>
                        <button
                            className={`tab-btn ${activeTab === "methodology-section" ? "active" : ""}`}
                            onClick={() => setActiveTab("methodology-section")}
                        >
                            Methodology
                        </button>
                    </div> */}

            {/* Metal Analysis Tab */}
            {activeTab === "metal-analysis" && (
              <div id="metal-analysis" className="results-section active">
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
                <div>
                    <Graphs />
                </div>

                <div>
                  <div className="pie-chart graph-card">
                    <Pie
                      data={{
                        labels: pieData.map((data) => data.label),
                        datasets: [
                          {
                            label: "Percentage",
                            data: pieData.map((data) => data.value),
                            backgroundColor: [
                              "rgb(46, 184, 122)", // slice 1 color
                              "rgb(53, 83, 133)", // slice 2 color
                              "rgba(225, 255, 187, 1)",
                              "rgb(0, 90, 157)",
                              "rgba(20, 61, 96, 1)",
                              "rgb(0, 117, 121)",
                              "rgba(160, 200, 120, 1)",
                            ],
                            borderColor: "white", // default border
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
                                }
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
              </div>
            )}

            {/* suggestions Tab */}
            {/* {activeTab === "suggestions-section" && (
                        <div id="suggestions-section" className="results-section active">
                            <div className="results-card">
                                <h2 className="card-title">Expert suggestions</h2>
                                <p className="card-subtitle">Based on the analysis results, here are our professional suggestions</p>
                                <div className="suggestion-group yellow">
                                    <p className="group-title">Immediate Actions Required</p>
                                    <ul>
                                        <li>Implement additional monitoring for Arsenic and Chromium levels</li>
                                        <li>Consider alternative water sources for consumption</li>
                                        <li>Install appropriate water treatment systems</li>
                                    </ul>
                                </div>
                                <div className="suggestion-group blue">
                                    <p className="group-title">Long-term Monitoring</p>
                                    <ul>
                                        <li>Schedule quarterly re-testing of this location</li>
                                        <li>Monitor nearby wells for similar contamination patterns</li>
                                        <li>Investigate potential contamination sources in the area</li>
                                    </ul>
                                </div>
                                <div className="suggestion-group green">
                                    <p className="group-title">Positive Indicators</p>
                                    <ul>
                                        <li>Lead, Cadmium, and Mercury levels are within safe ranges</li>
                                        <li>Overall HMPI indicates manageable contamination level</li>
                                        <li>No immediate health emergency detected</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )} */}

            {/* Methodology Tab */}
            {/* {activeTab === "methodology-section" && (
                        <div id="methodology-section" className="results-section active">
                            <div className="results-card">
                                <h2 className="card-title">Calculation Methodology</h2>
                                <p className="card-subtitle">Technical details of the HMPI calculation process</p>
                                <div className="methodology-section">
                                    <h3>HMPI Formula</h3>
                                    <div className="formula-box">
                                        <p className="formula">
                                            HMPI = Σ(Mi/Si) × Wi
                                        </p>
                                    </div>
                                    <p className="formula-details">
                                        Where <b>Mi</b> = Measured concentration, <b>Si</b> = Standard limit, <b>Wi</b> = Weight factor
                                    </p>
                                </div>
                                <div className="methodology-section">
                                    <h3>Standards Reference</h3>
                                    <ul className="standard-list">
                                        <li>WHO Guidelines for Drinking Water Quality (2017)</li>
                                        <li>EPA National Primary Drinking Water Standards</li>
                                        <li>International standards for groundwater assessment</li>
                                    </ul>
                                </div>
                                <div className="methodology-section">
                                    <h3>Classification Ranges</h3>
                                    <div className="classification-grid">
                                        <div className="classification-box safe">
                                            <p className="range-value">Low Risk (0-50)</p>
                                            <p className="range-description">Safe for consumption</p>
                                        </div>
                                        <div className="classification-box moderate">
                                            <p className="range-value">Medium Risk (50-100)</p>
                                            <p className="range-description">Monitor closely</p>
                                        </div>
                                        <div className="classification-box elevated">
                                            <p className="range-value">High Risk (100+)</p>
                                            <p className="range-description">Immediate action required</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )} */}
          </div>
        </main>
      </div>
    );
};
