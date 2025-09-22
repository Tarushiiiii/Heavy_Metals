import { useEffect } from "react";
import { Reports_Api } from "../utils/constants";
import { useReportStore } from "../store/reportStore";

const ReportFetcher = () => {
    const setReports = useReportStore((state) => state.setReports);
    const reports = useReportStore((state) => state.reports);  // Get current reports

    useEffect(() => {
        if (reports.length === 0) {  // Only fetch if reports array is empty
            fetch(Reports_Api)
                .then((res) => res.json())
                .then((data) => setReports(data.data))  // Adjust depending on API structure
                .catch((error) => console.error("Failed to fetch reports:", error));
        }
    }, [setReports, reports.length]);  // Only re-fetch when reports array is empty

    return null; // No need to render anything
};

export default ReportFetcher;