import { jsPDF } from "jspdf";

import logoImage from "../../assets/images/logo.png";
import { formatReportForDownload } from "../../utils/functions/getReport";
import { getLocationName } from "../../utils/functions/utility";

export const scrollToBottom = (ref) => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
};

// ================== PDF DOWNLOAD FUNCTION ==================
export const handleDownloadReport = (reportData) => {
    const finalReportData = formatReportForDownload(reportData);
    const doc = new jsPDF();

    const pageMargin = 5;
    const pageContentWidth = 210 - 2 * pageMargin;
    const marginLeft = pageMargin + 5;
    const fullBoxWidth = pageContentWidth - 10; // 190mm full-width centered box
    const halfBoxWidth = fullBoxWidth / 2 - 3;  // 92mm for side-by-side columns
    const leftColX = marginLeft;
    const rightColX = marginLeft + halfBoxWidth + 6;

    const labelWidth = 35;
    const lineHeight = 6;
    const contentPadding = 2;
    let currentY = 10;

    // PAGE BORDER
    doc.rect(pageMargin, pageMargin, pageContentWidth, 297 - 2 * pageMargin);

    const drawItem = (x, y, label, value, customWidth = fullBoxWidth) => {
        doc.setFont("helvetica", "bold");
        doc.text(label + ":", x + contentPadding, y);
        doc.setFont("helvetica", "normal");
        const valueWidth = customWidth - labelWidth - 5;
        const lines = doc.splitTextToSize(String(value), valueWidth);
        doc.text(lines, x + labelWidth + contentPadding, y);
        return lineHeight * Math.max(lines.length, 1);
    };

    const drawBoxHeader = (x, y, title, customWidth = fullBoxWidth) => {
        doc.setFillColor(52, 189, 172);
        doc.rect(x, y, customWidth, lineHeight, "F");
        doc.setTextColor(255);
        doc.setFont("helvetica", "bold");
        doc.text(title, x + contentPadding, y + 4.5);
        doc.setTextColor(0);
    };

    // ── HEADER ──
    doc.addImage(logoImage, "PNG", marginLeft, currentY, 10, 15);
    doc.setFontSize(18);
    doc.text(
        "Ground Water Unified Heavy Metal Index",
        marginLeft + 15,
        currentY + 5
    );
    doc.setFontSize(11);
    doc.text("Sample Information", marginLeft + 15, currentY + 12);
    currentY += 18;

    const regionIdentifier = getLocationName(reportData);
    const sampleId = reportData.sample_id || `GW-${regionIdentifier.substring(0, 3).toUpperCase()}`;
    doc.text(`Sample ID: ${sampleId}`, marginLeft, currentY);
    currentY += 10;

    // ── 1. LOCATION DETAILS BOX (CENTERED FULL-WIDTH) ──
    drawBoxHeader(marginLeft, currentY, "Location Details", fullBoxWidth);
    let y1 = currentY + 10;
    y1 += drawItem(marginLeft, y1, "Coordinates", finalReportData.Coordinates, fullBoxWidth);
    y1 += drawItem(marginLeft, y1, "Place", finalReportData.Place, fullBoxWidth);
    doc.rect(marginLeft, currentY, fullBoxWidth, y1 - currentY + 5);
    currentY = y1 + 10;

    // ── 2. HMPI VALUES BOX (CENTERED FULL-WIDTH) ──
    drawBoxHeader(marginLeft, currentY, "HMPI Values", fullBoxWidth);
    let y2 = currentY + 10;
    y2 += drawItem(marginLeft, y2, "HPI Value", finalReportData["HPI Value"], fullBoxWidth);
    y2 += drawItem(marginLeft, y2, "HEI Value", finalReportData["HEI Value"], fullBoxWidth);
    y2 += drawItem(marginLeft, y2, "MI Value", finalReportData["MI Value"], fullBoxWidth);
    y2 += drawItem(marginLeft, y2, "Cd Value", finalReportData["Cd Value"], fullBoxWidth);
    doc.rect(marginLeft, currentY, fullBoxWidth, y2 - currentY + 5);
    currentY = y2 + 10;

    // ── 3. COMPOSITE INDEX (LEFT) & STATUS LEGEND (RIGHT) SIDE-BY-SIDE ──
    const sideBoxY = currentY;
    const ciValue = Number(finalReportData["CI Value"] || 0);

    let boxColor = [82, 209, 122];
    let statusText = "Safe";

    if (ciValue >= 100) {
        boxColor = [255, 92, 92];
        statusText = "Critical";
    } else if (ciValue >= 50) {
        boxColor = [255, 204, 0];
        statusText = "Alert";
    }

    // Left Box: Composite Index
    drawBoxHeader(leftColX, sideBoxY, "Composite Index", halfBoxWidth);

    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Unified Value", leftColX + halfBoxWidth / 2, sideBoxY + 12, { align: "center" });

    doc.setFillColor(...boxColor);
    doc.rect(leftColX + 16, sideBoxY + 17, halfBoxWidth - 32, 10, "F");

    doc.setTextColor(0);
    doc.setFontSize(13);
    doc.text(ciValue.toFixed(2), leftColX + halfBoxWidth / 2, sideBoxY + 24.5, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(statusText, leftColX + halfBoxWidth / 2, sideBoxY + 34, { align: "center" });

    doc.rect(leftColX, sideBoxY, halfBoxWidth, 40);

    // Right Box: Status Legend
    drawBoxHeader(rightColX, sideBoxY, "Status Legend", halfBoxWidth);

    doc.setFontSize(9.5);
    doc.setFont("helvetica", "normal");

    let legY = sideBoxY + 13;
    doc.setFillColor(82, 209, 122);
    doc.circle(rightColX + 16, legY + 2, 2.5, "F");
    doc.text("Safe  (< 50)", rightColX + 23, legY + 3);

    legY += 8;
    doc.setFillColor(255, 204, 0);
    doc.circle(rightColX + 16, legY + 2, 2.5, "F");
    doc.text("Alert  (50 - 100)", rightColX + 23, legY + 3);

    legY += 8;
    doc.setFillColor(255, 92, 92);
    doc.circle(rightColX + 16, legY + 2, 2.5, "F");
    doc.text("Critical  (>= 100)", rightColX + 23, legY + 3);

    doc.rect(rightColX, sideBoxY, halfBoxWidth, 40);

    currentY = sideBoxY + 48;

    // ── 4. ASSESSMENT BOX (CENTERED FULL-WIDTH) ──
    drawBoxHeader(marginLeft, currentY, "Assessment", fullBoxWidth);
    let y3 = currentY + 10;
    y3 += drawItem(marginLeft, y3, "Risk", finalReportData.Risk, fullBoxWidth);
    y3 += drawItem(marginLeft, y3, "Root Cause", finalReportData["Root Cause"], fullBoxWidth);
    y3 += drawItem(marginLeft, y3, "Suggestion", finalReportData.Suggestion, fullBoxWidth);
    if (finalReportData["Pollution Source"]) {
        y3 += drawItem(marginLeft, y3, "Source",      finalReportData["Pollution Source"], fullBoxWidth);
        y3 += drawItem(marginLeft, y3, "Confidence",  finalReportData["Source Confidence"], fullBoxWidth);
        y3 += drawItem(marginLeft, y3, "Pattern",     finalReportData["Pollution Pattern"], fullBoxWidth);
        y3 += drawItem(marginLeft, y3, "Dominant",    finalReportData["Dominant Metal"], fullBoxWidth);
    }
    doc.rect(marginLeft, currentY, fullBoxWidth, y3 - currentY + 5);

    // ── FOOTER ──
    doc.setFontSize(10);
    doc.setTextColor(51, 51, 255);
    doc.text("JalDhatu", 105, 285, { align: "center" });

    const safePlace = (finalReportData.Place || regionIdentifier)
        .replace(/[/\\?%*:|"<>]/g, "")
        .trim();
    doc.save(`${safePlace} HMPI Report.pdf`);
};

export const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError("");
    setFileName(file.name);

    try {
        const formData = new FormData();
        formData.append("file", file);

        const BASE_URL =
            window.location.hostname === "localhost"
                ? "http://127.0.0.1:8000"
                : (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000");

        const response = await axios.post(`${BASE_URL}/pipeline/run`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data.status && response.data.status !== "success") {
            setError(response.data.message || "Failed to process the dataset on backend.");
            setLoading(false);
            return;
        }

        const results = response.data.results || [];
        if (results.length === 0) {
            setError("No sample rows detected in the uploaded dataset.");
            setLoading(false);
            return;
        }
    } catch (err) {
        console.error(err);
        setError("An error occurred while uploading or processing the file. Please check column headers and try again.");
    } finally {
        setLoading(false);
    }
};