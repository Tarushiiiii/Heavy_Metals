import { FlaskConical, TestTubeDiagonal } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ManualUpload() {
    const navigate = useNavigate();
    const handleManualSubmit = (event) => {
        event.preventDefault();
        navigate("/analysis");
    };

    return (
        <div id="manual-entry-form" className="tab-content active">
            <form className="calculator-form" onSubmit={handleManualSubmit}>
                <div className="card-section">
                    <h2 className="card-title">
                        <FlaskConical size={20} strokeWidth={2} />
                        Sample Information
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
                        <TestTubeDiagonal size={20} strokeWidth={2} />
                        Heavy Metal Concentrations
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
                    <button type="submit" className="btn calculate-btn" onClick={handleManualSubmit}>
                        Calculate HMPI
                    </button>
                </div>
            </form>
        </div>
    );
}
