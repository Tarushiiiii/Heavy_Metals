import { create } from "zustand";
import { reportsData } from "../utils/constants";

export const useReportStore = create((set) => ({
    reports: reportsData, // reportsData is []
    setReports: (reports) => set({ reports }),
    addReport: (report) => set((state) => ({ reports: [...state.reports, report] })),
}));