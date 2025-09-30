export const Suggestion = () => {
  return (
    <div id="suggestions-section" className="results-section active">
      <div className="results-card">
        <h2 className="card-title">Expert suggestions</h2>
        <p className="card-subtitle">
          Based on the analysis results, here are our professional suggestions
        </p>
        {/* suggestions */}
        <div className="suggestion-group yellow">
          <p className="group-title">Immediate Actions Required</p>
          <ul>
            <li>
              Implement additional monitoring for Arsenic and Chromium levels
            </li>
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
  );
};
