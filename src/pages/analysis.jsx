import { useState } from "react";
import { Button } from "../components/ui/button";
import "../components/ui/css/analysis.css";
import { FileWarning } from "lucide-react";
import { Chart as ChartJs } from "chart.js/auto";
import { Bar, Pie, Line } from "react-chartjs-2";

import sourceData from "../components/graphs/sourceData.json"

export const Analysis = () => {
    // Tabs state control
    const [activeTab, setActiveTab] = useState("metal-analysis");

    return (
        <div>
            <div className="main-header-wrapper">
                <div className="main-header">Analysis</div>
                <div className="main-text">
                    Visualize and interpret your HMPI results with detailed breakdowns, risk assessments, and expert recommendations.
                </div>
            </div>
            <main className="results-page">
                <div className="container">
                    <div className="results-header">
                        <Button colorVariant="primary" type="main" onClickHandler={() => { }}>
                            Export Report
                        </Button>
                        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded flex items-center gap-2">
                            <FileWarning size={24} strokeWidth={1.8} />
                            For the privacy concerns we do not store any data on our servers. If you wish then click to save your results locally.
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
                                <div className="status-badge elevated">Moderate Pollution</div>
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
                                <div className="risk-bar-fill moderate-fill" style={{ width: "67.3%" }}></div>
                            </div>
                            <div className="risk-labels">
                                <span>Safe (0-50)</span>
                                <span>Moderate (50-100)</span>
                                <span>High Risk (100+)</span>
                            </div>
                        </div>
                    </div>

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
                    </div>

                    {/* Metal Analysis Tab */}
                    {activeTab === "metal-analysis" && (
                        <div id="metal-analysis" className="results-section active">
                            <h2 className="section-title">Individual Heavy Metal Analysis</h2>
                            <p className="section-subtitle">Detailed breakdown of each heavy metal concentration versus safety limits</p>
                            {/* Sample analysis for each metal */}
                            {/* Repeat for each metal as below */}
                            <div className="metal-item">
                                <div className="metal-info">
                                    <p className="metal-name">Lead (Pb)</p>
                                    <p className="metal-value">8.5 <span className="unit">µg/L</span></p>
                                    <p className="metal-limit">Limit: 10 µg/L</p>
                                </div>
                                <div className="metal-graph">
                                    <div className="metal-label">85% of safety limit</div>
                                    <div className="metal-bar-track">
                                        <div className="metal-bar-fill safe-fill" style={{ width: "85%" }}></div>
                                    </div>
                                </div>
                                <div className="metal-status">
                                    <span className="status-badge safe">Safe</span>
                                </div>
                            </div>
                            <div>
                                {/* --- Graph for Lead --- */}
                                <div className="metal-graph">
                                    <div>
                                        {/* <img
                                            src="src/assets/images/lead.jpeg"
                                            alt="Lead Graph"
                                            className="w-60% h-auto mx-auto mt-10"
                                        /> */}

                                        <Bar
                                            data={{
                                                labels: ["A", "B", "C", "d", "e", "f", "g"],
                                                datasets: [
                                                    {
                                                        label: "Place1",
                                                        data: [2, 3, 5, 6, 2, 7, 8],
                                                    },
                                                    {
                                                        label: "Place2",
                                                        data: [1, 5, 9, 4, 1, 8, 3],
                                                    },
                                                    {
                                                        label: "Place3",
                                                        data: [8, 3, 1, 7, 4, 2, 1]
                                                    }
                                                ]
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* ...repeat for other metals */}
                            {/* --- Cadmium --- */}
                            <div className="metal-item">
                                <div className="metal-info">
                                    <p className="metal-name">Cadmium (Cd)</p>
                                    <p className="metal-value">3.2 <span className="unit">µg/L</span></p>
                                    <p className="metal-limit">Limit: 5 µg/L</p>
                                </div>
                                <div className="metal-graph">
                                    <div className="metal-label">64% of safety limit</div>
                                    <div className="metal-bar-track">
                                        <div className="metal-bar-fill safe-fill" style={{ width: "64%" }}></div>
                                    </div>
                                </div>
                                <div className="metal-status">
                                    <span className="status-badge safe">Safe</span>
                                </div>
                            </div>
                            <div>
                                {/* --- Graph for Cadmium --- */}
                                <div className="pie-chart">
                                    <Pie
                                        data={{
                                            labels: sourceData.map((data) => data.label),
                                            datasets: [
                                                {
                                                    label: "Count",
                                                    data: sourceData.map((data) => data.value),
                                                },
                                            ]
                                        }}
                                    />
                                </div>
                            </div>
                            {/* Add remaining metal blocks similarly... */}
                            {/* Mercury, Arsenic, Chromium, Copper, Zinc, Nickel */}
                        </div>
                    )}

                    {/* Recommendations Tab */}
                    {activeTab === "recommendations-section" && (
                        <div id="recommendations-section" className="results-section active">
                            <div className="results-card">
                                <h2 className="card-title">Expert Recommendations</h2>
                                <p className="card-subtitle">Based on the analysis results, here are our professional recommendations</p>
                                {/* Recommendations */}
                                <div className="recommendation-group yellow">
                                    <p className="group-title">Immediate Actions Required</p>
                                    <ul>
                                        <li>Implement additional monitoring for Arsenic and Chromium levels</li>
                                        <li>Consider alternative water sources for consumption</li>
                                        <li>Install appropriate water treatment systems</li>
                                    </ul>
                                </div>
                                <div className="recommendation-group blue">
                                    <p className="group-title">Long-term Monitoring</p>
                                    <ul>
                                        <li>Schedule quarterly re-testing of this location</li>
                                        <li>Monitor nearby wells for similar contamination patterns</li>
                                        <li>Investigate potential contamination sources in the area</li>
                                    </ul>
                                </div>
                                <div className="recommendation-group green">
                                    <p className="group-title">Positive Indicators</p>
                                    <ul>
                                        <li>Lead, Cadmium, and Mercury levels are within safe ranges</li>
                                        <li>Overall HMPI indicates manageable contamination level</li>
                                        <li>No immediate health emergency detected</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Methodology Tab */}
                    {activeTab === "methodology-section" && (
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
                    )}

                </div>
            </main>
        </div>
    );
};
