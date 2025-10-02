import { useState } from "react";
import { KeyRound } from 'lucide-react';

export default function APIUpload() {
    const [csvFile, setCsvFile] = useState(null);

    const handleAPIUpload = (event) => {
        // const file = event.target.files[0];
        // if (file) {
        //     setCsvFile(file);

        //     const reader = new FileReader();
        //     reader.onload = (e) => {
        //         const text = e.target.result;
        //         const rows = text.split("\n").map((row) => row.split(","));
        //     };
        //     reader.readAsText(file);
        // }
    };

    return (
        <div id="bulk-upload-form" className="tab-content active">
            <h2 className="card-title">
                <KeyRound size={24} strokeWidth={2.5} />
                Process API Data
            </h2>
            {/* <div className="upload-area">
                <div className="upload-box">
                    <i className="fas fa-upload fa-3x"></i>
                    <p className="upload-text">Upload CSV File</p>
                    <p className="card-subtitle">
                        Upload a CSV file with multiple groundwater samples for batch processing
                    </p>
                    <button
                        className="btn choose-file-btn"
                        onClick={() => document.getElementById("file-upload").click()}
                    >
                        Choose File
                    </button>
                    <input
                        type="file"
                        id="file-upload"
                        accept=".csv"
                        style={{ display: "none" }}
                        onChange={handleAPIUpload}
                    />
                </div>
            </div> */}
            <div className="card">
                <div className="input-group">
                    <label htmlFor="api_key">
                        API Key
                        {/* <span className="key">Key: 10 µg/L</span> */}
                    </label>
                    <input type="text" id="api_key" placeholder="Enter your Data API key" />
                </div>
            </div>


            {/* Show uploaded file name */}
            {/* {csvFile && (
                <div className="card-section grid grid-cols-[auto_1fr] items-center gap-3">
                    <Check size={20} strokeWidth={3} className="text-green-600" />
                    <div className="font-medium text-gray-700">
                        Uploaded File: <span className="font-semibold">{csvFile.name}</span>
                    </div>
                </div>
            )} */}


            <div className="requirements-card">
                <h3 className="card-title">API Format Requirements:</h3>
                <ul>
                    <li>Enter your API Key to connect your account</li>
                    <li>Your API Key will be processed securely and is never shared.</li>
                    <li>Keep this key safe - it works like a password.</li>
                </ul>
            </div>
        </div>
    );
}
