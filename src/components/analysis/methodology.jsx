export const Methodology = () => {
  return (
    <div id="methodology-section" className="results-section active">
      <div className="results-card">
        <h2 className="card-title">Calculation Methodology</h2>
        <p className="card-subtitle">
          Technical details of the HMPI calculation process
        </p>
        <div className="methodology-section">
          <h3>HMPI Formula</h3>
          <div className="formula-box">
            <p className="formula">HMPI = Σ(Mi/Si) × Wi</p>
          </div>
          <p className="formula-details">
            Where <b>Mi</b> = Measured concentration, <b>Si</b> = Standard
            limit, <b>Wi</b> = Weight factor
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
  );
};
