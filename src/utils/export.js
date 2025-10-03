export const ExportReport = () => {
  const reportElement = document.getElementById("report-content");

  if (!reportElement) {
    console.error("Report content not found!");
    return;
  }

  const htmlContent = `
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          .card-title {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
          }
          .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 10px;
          }
          .info-item {
            background: #f5f5f5;
            padding: 10px;
            border-radius: 5px;
          }
          .info-label {
            font-weight: bold;
            display: block;
            margin-bottom: 4px;
          }
        </style>
      </head>
      <body>
        ${reportElement.outerHTML}
      </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "HMPI_Report.html";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
