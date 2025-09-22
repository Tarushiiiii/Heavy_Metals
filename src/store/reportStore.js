import { create } from "zustand";

export const useReportStore = create < ReportState > ((set) => ({
    reports: [],
    setReports: (reports) => set({ reports }),
    addReport: (report) => set((state) => ({ reports: [...state.reports, report] })),
}));