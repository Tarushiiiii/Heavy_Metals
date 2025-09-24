import { ReportsTable } from "../components/ui/report_table.jsx";
import { useReportStore } from "../store/reportStore";


export const Reports = () => {
    const reports = useReportStore((state) => state.reports);

    return (
        <div>
            <div className="main-header-wrapper">
                <div className="main-header">HMPI Reports</div>
                <div className="main-text">
                    View and manage all HMPI reports generated from groundwater sample data.
                </div>
            </div>

            <div className="card">
                <table className="reports-table">
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
                        {reports.map((report, index) => (
                            <ReportsTable key={index} report={report} index={index} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};
