import { create } from "zustand";
import { reportsData } from "../utils/constants";
import { formatUploadedRecordsToReports } from "../utils/functions/utility";

const initialReports = formatUploadedRecordsToReports(reportsData);

export const useReportStore = create((set) => ({
    reports: initialReports.length > 0 ? initialReports : reportsData,
    setReports: (reports) => set({ reports }),
    addReport: (report) => set((state) => ({ reports: [...state.reports, report] })),
}));