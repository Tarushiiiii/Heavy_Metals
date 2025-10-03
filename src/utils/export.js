import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Constants
const PDF_WIDTH_MM = 210;
const PDF_HEIGHT_MM = 297;
const MARGIN = 10;
const HEADER_HEIGHT = 15;
const FOOTER_HEIGHT = 10;
const CONTENT_HEIGHT =
  PDF_HEIGHT_MM - HEADER_HEIGHT - FOOTER_HEIGHT - 2 * MARGIN;

// Helper: Draw Header and Footer
const drawHeaderAndFooter = (pdf, pageNumber, sampleId = "GW-001") => {
  pdf.setFontSize(16);
  pdf.setTextColor(50, 150, 255);

  const title = "JalDhatu HMPI Analysis Report";
  const titleWidth = pdf.getTextWidth(title);
  const titleX = (PDF_WIDTH_MM - titleWidth) / 2;
  pdf.text(title, titleX, MARGIN + 5);

  // Line below header
  pdf.setDrawColor(200, 200, 200);
  pdf.line(MARGIN, MARGIN + 10, PDF_WIDTH_MM - MARGIN, MARGIN + 10);

  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(150);

  // FIX: Always string
  let sampleString = sampleId;
  if (typeof sampleId === "object") {
    // Try to stringify, fallback to GW-001 if it fails
    try {
      sampleString = JSON.stringify(sampleId);
    } catch {
      sampleString = "GW-001";
    }
  }
  const footerText = `Sample ID: ${sampleString} | Date: ${new Date().toLocaleDateString(
    "en-GB"
  )}`;
  pdf.text(footerText, MARGIN, PDF_HEIGHT_MM - MARGIN + 5);

  const pageNumText = `Page ${pageNumber}`;
  const pageNumWidth = pdf.getTextWidth(pageNumText);
  const pageNumX = PDF_WIDTH_MM - MARGIN - pageNumWidth;
  pdf.text(pageNumText, pageNumX, PDF_HEIGHT_MM - MARGIN + 5);
};

// Helper: Wait until charts (canvas) are rendered
const waitForChartsRender = () =>
  new Promise((resolve) => setTimeout(resolve, 2000)); // 2s wait is usually safe

// Main Export Function
export const ExportReport = async (sampleId = "GW-001") => {
  const reportElement = document.getElementById("report-content");
  const fileName = `JalDhatu_HMPI_Report_${
    typeof sampleId === "string" ? sampleId : "Sample"
  }.pdf`;

  if (!reportElement) {
    console.error("Report content not found!");
    return;
  }

  await waitForChartsRender(); // Wait for all charts/canvases to be rendered

  html2canvas(reportElement, {
    scale: 3, // High-quality scaling
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#ffffff",
    windowWidth: reportElement.scrollWidth,
    windowHeight: reportElement.scrollHeight,
    logging: false,
    removeContainer: true,
  })
    .then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = PDF_WIDTH_MM - 2 * MARGIN;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pxPerMm = canvas.height / imgHeight;
      const pageHeightPx = CONTENT_HEIGHT * pxPerMm;

      let renderedHeight = 0;
      let pageNumber = 1;

      while (renderedHeight < canvas.height) {
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = Math.min(
          pageHeightPx,
          canvas.height - renderedHeight
        );

        const ctx = pageCanvas.getContext("2d");
        ctx.drawImage(
          canvas,
          0,
          renderedHeight,
          canvas.width,
          pageCanvas.height,
          0,
          0,
          canvas.width,
          pageCanvas.height
        );

        const imgData = pageCanvas.toDataURL("image/png");

        if (pageNumber > 1) pdf.addPage();
        drawHeaderAndFooter(pdf, pageNumber, sampleId);
        pdf.addImage(
          imgData,
          "PNG",
          MARGIN,
          MARGIN + HEADER_HEIGHT,
          imgWidth,
          CONTENT_HEIGHT
        );

        renderedHeight += pageHeightPx;
        pageNumber++;
      }

      pdf.save(fileName);
    })
    .catch((error) => {
      console.error("PDF generation failed:", error);
    });
};
