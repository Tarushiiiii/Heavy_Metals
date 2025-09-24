import React, { useState } from "react";
import "../components/ui/css/data_entry.css";

export const CalculateHMPI = () => {
    // State for tab switching
    const [activeTab, setActiveTab] = useState("manual");

    // Handler for tab switching
    const showTab = (tabId) => {
        setActiveTab(tabId);
    };

    // Handler for form submissions (stub)
    const handleManualSubmit = (e) => {
        e.preventDefault();
        // Add logic to calculate HMPI or show results here
    };

    // Handler for file uploads (stub)
    const handleBulkUpload = (e) => {
        // Add logic to parse CSV and process batch data here
    };

    return (
        <div>
            <div className="main-header-wrapper">
                <div className="main-header">Calculate HMPI</div>
                <div className="main-text">
                    Enter groundwater sample data to calculate Heavy Metal Pollution Index (HMPI) or upload bulk data via CSV for batch processing.
                </div>
            </div>

            <div className="calculator-tabs">
                <button
                    className={`tab-btn ${activeTab === "manual" ? "active" : ""}`}
                    onClick={() => showTab("manual")}
                >
                    Manual Entry
                </button>
                <button
                    className={`tab-btn ${activeTab === "bulk" ? "active" : ""}`}
                    onClick={() => showTab("bulk")}
                >
                    Bulk Upload
                </button>
            </div>

            {/* Manual Entry Form */}
            {activeTab === "manual" && (
                <div id="manual-entry-form" className="tab-content active">
                    <form className="calculator-form" onSubmit={handleManualSubmit}>
                        <div className="card-section">
                            <h2 className="card-title">
                                <i className="fas fa-map-marker-alt"></i> Sample Information
                            </h2>
                            <p className="card-subtitle">
                                Enter basic information about your groundwater sample
                            </p>
                            <div className="input-grid">
                                <div className="input-group">
                                    <label htmlFor="sampleId">Sample ID</label>
                                    <input type="text" id="sampleId" placeholder="e.g., GW-001" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="depth">Depth (m)</label>
                                    <input type="text" id="depth" placeholder="e.g., 15.5" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="latitude">Latitude</label>
                                    <input type="text" id="latitude" placeholder="e.g., 40.7128" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="longitude">Longitude</label>
                                    <input type="text" id="longitude" placeholder="e.g., -74.0060" />
                                </div>
                            </div>
                        </div>

                        <div className="card-section">
                            <h2 className="card-title">
                                <i className="fas fa-file-alt"></i> Heavy Metal Concentrations
                            </h2>
                            <p className="card-subtitle">
                                Enter the concentration values for each heavy metal detected
                            </p>
                            <div className="input-grid metal-grid">
                                <div className="input-group">
                                    <label htmlFor="lead">
                                        Lead (Pb) <span className="limit">Limit: 10 µg/L</span>
                                    </label>
                                    <input type="text" id="lead" placeholder="Enter value in µg/L" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="cadmium">
                                        Cadmium (Cd) <span className="limit">Limit: 5 µg/L</span>
                                    </label>
                                    <input type="text" id="cadmium" placeholder="Enter value in µg/L" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="mercury">
                                        Mercury (Hg) <span className="limit">Limit: 6 µg/L</span>
                                    </label>
                                    <input type="text" id="mercury" placeholder="Enter value in µg/L" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="arsenic">
                                        Arsenic (As) <span className="limit">Limit: 10 µg/L</span>
                                    </label>
                                    <input type="text" id="arsenic" placeholder="Enter value in µg/L" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="chromium">
                                        Chromium (Cr) <span className="limit">Limit: 50 µg/L</span>
                                    </label>
                                    <input type="text" id="chromium" placeholder="Enter value in µg/L" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="copper">
                                        Copper (Cu) <span className="limit">Limit: 2 mg/L</span>
                                    </label>
                                    <input type="text" id="copper" placeholder="Enter value in mg/L" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="zinc">
                                        Zinc (Zn) <span className="limit">Limit: 3 mg/L</span>
                                    </label>
                                    <input type="text" id="zinc" placeholder="Enter value in mg/L" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="nickel">
                                        Nickel (Ni) <span className="limit">Limit: 70 µg/L</span>
                                    </label>
                                    <input type="text" id="nickel" placeholder="Enter value in µg/L" />
                                </div>
                            </div>
                        </div>
                        <div className="button-container">
                            <button type="submit" className="btn calculate-btn">
                                Calculate HMPI
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Bulk Upload Form */}
            {activeTab === "bulk" && (
                <div id="bulk-upload-form" className="tab-content active">
                    <div className="card-section">
                        <h2 className="card-title">
                            <i className="fas fa-upload"></i> Bulk Data Upload
                        </h2>
                        <p className="card-subtitle">
                            Upload a CSV file with multiple groundwater samples for batch processing
                        </p>
                        <div className="upload-area">
                            <div className="upload-box">
                                <i className="fas fa-upload fa-3x"></i>
                                <p className="upload-text">Upload CSV File</p>
                                <p className="drag-drop-text">Drag and drop your file here, or click to browse</p>
                                <button className="btn choose-file-btn" onClick={() => document.getElementById('file-upload').click()}>
                                    Choose File
                                </button>
                                <input
                                    type="file"
                                    id="file-upload"
                                    accept=".csv"
                                    style={{ display: "none" }}
                                    onChange={handleBulkUpload}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="card-section csv-requirements-card">
                        <h3 className="card-title">CSV Format Requirements:</h3>
                        <ul>
                            <li>First row should contain column headers</li>
                            <li>Include columns: <b>sample_id</b>, <b>latitude</b>, <b>longitude</b>, <b>depth</b></li>
                            <li>Heavy metal columns: <b>pb</b>, <b>cd</b>, <b>hg</b>, <b>as</b>, <b>cr</b>, <b>cu</b>, <b>zn</b>, <b>ni</b></li>
                            <li>Use numeric values only for concentrations</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};
