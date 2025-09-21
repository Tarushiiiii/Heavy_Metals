export const StatusLegend = () => {
    return (
        <div className="card">
            <div className="card-title"> Status Legend</div>
            <div className="status-legend-list">
                <div className="status-legend-item">
                    <div className="status-dot positive"></div>
                    <div className="card-label">Safe</div>
                </div>
                <div className="status-legend-item">
                    <div className="status-dot negative"></div>
                    <div className="card-label">Alert</div>
                </div>
                <div className="status-legend-item">
                    <div className="status-dot critical"></div>
                    <div className="card-label">Critical</div>
                </div>
            </div>
        </div>
    );
}