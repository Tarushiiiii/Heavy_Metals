import { useState } from "react";
import { KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function APIUpload() {
  //   const [csvFile, setCsvFile] = useState(null);
  const navigate = useNavigate();

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

  const calculate_hmpi = (event) => {
    navigate("/analysis");
  };

  return (
    <div id="bulk-upload-form" className="tab-content active">
      <h2 className="card-title">
        <KeyRound size={24} strokeWidth={2.5} />
        Process API Data
      </h2>
      <div className="card">
        <div className="input-group">
          <label htmlFor="api_key">
            API Key
            {/* <span className="key">Key: 10 µg/L</span> */}
          </label>
          <input
            type="text"
            id="api_key"
            placeholder="Enter your Data API key"
          />
        </div>
      </div>

      <div className="requirements-card">
        <h3 className="card-title">API Format Requirements:</h3>
        <ul>
          <li>Enter your API Key to connect your account</li>
          <li>Your API Key will be processed securely and is never shared.</li>
          <li>Keep this key safe - it works like a password.</li>
        </ul>
      </div>

      <div className="button-container">
        <button
          type="submit"
          className="btn calculate-btn"
          onClick={calculate_hmpi}
        >
          Calculate HMPI
        </button>
      </div>
    </div>
  );
}
