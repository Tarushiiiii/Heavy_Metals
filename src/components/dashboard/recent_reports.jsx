export const RecentReports = () => {
    return (
        <div className="card">
            <div className="card-title">
                Recent Reports
            </div>
            <table className="recent-reports-table">
                <thead>
                    <tr>
                        <th>Report ID</th>
                        <th>Region</th>
                        <th>Date</th>
                        <th>Metal</th>
                        <th>HMPI</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map through recent reports data and create rows */}
                </tbody>
            </table>

        </div>
    );
}