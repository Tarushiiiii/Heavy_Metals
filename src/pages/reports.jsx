import { Link, useParams } from "react-router-dom";
import { useReportStore } from "../store/reportStore";
import { Button } from "../components/ui/button";

export const Reports = () => {

    const { id } = useParams();
    const { reports } = useReportStore();
    const report = reports.find((r) => r.slug === id);

    if (!report) return <div className="p-4">Report not found!</div>

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">{report.title}</h2>
            <p>{report.company} - {report.location}</p>
            {/* <p>{report.description}</p> */}
            <p dangerouslySetInnerHTML={{ __html: report.description }} />
            <Link to={`/applyReports/${report.slug}`}><Button>Apply Here!</Button></Link>
        </div >
    );
}