import React, { useState } from "react";
import "../components/ui/css/data_entry.css";
import BulkUpload from "../components/functions/bulkUpload";
import ManualUpload from "../components/functions/manualUpload";

export const CalculateHMPI = () => {
    // State for tab switching
    const [activeTab, setActiveTab] = useState("manual");

    // Handler for tab switching
    const showTab = (tabId) => {
        setActiveTab(tabId);
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
            {activeTab === "manual" && 
                <ManualUpload/>
            }

            {/* Bulk Upload Form */}
            {activeTab === "bulk" && 
                <BulkUpload/>
            }
        </div>
    );
};

