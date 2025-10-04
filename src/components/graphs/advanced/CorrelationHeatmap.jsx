import React from "react";
import { Chart as ChartJS, Tooltip, Legend, Title, LinearScale } from "chart.js";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import { Chart } from "react-chartjs-2";

ChartJS.register(MatrixController, MatrixElement, Tooltip, Legend, Title, LinearScale);

const metals = ["Cd", "Pb", "As", "Cr", "Ni", "Cu", "Zn", "Fe", "Mn"];

// Example correlation data
const correlations = [
  [1.0, 0.9, 0.2, 0.4, 0.7, 0.1, 0.6, 0.3, 0.8],
  [0.9, 1.0, 0.3, 0.5, 0.8, 0.2, 0.7, 0.4, 0.9],
  [0.2, 0.3, 1.0, 0.6, 0.2, 0.5, 0.3, 0.6, 0.4],
  [0.4, 0.5, 0.6, 1.0, 0.5, 0.7, 0.2, 0.3, 0.6],
  [0.7, 0.8, 0.2, 0.5, 1.0, 0.4, 0.8, 0.2, 0.7],
  [0.1, 0.2, 0.5, 0.7, 0.4, 1.0, 0.5, 0.3, 0.6],
  [0.6, 0.7, 0.3, 0.2, 0.8, 0.5, 1.0, 0.4, 0.7],
  [0.3, 0.4, 0.6, 0.3, 0.2, 0.3, 0.4, 1.0, 0.5],
  [0.8, 0.9, 0.4, 0.6, 0.7, 0.6, 0.7, 0.5, 1.0],
];

const CorrelationHeatmap = () => {
  const data = {
    datasets: [
      {
        label: "Correlation",
        data: correlations.flatMap((row, i) =>
          row.map((value, j) => ({
            x: metals[j],
            y: metals[i],
            v: value,
          }))
        ),
        backgroundColor(ctx) {
          const value = ctx.raw.v;
          const interpolate = (c1, c2, factor) => {
            const rgba = (c) => c.match(/\d+/g).map(Number);
            const [r1, g1, b1] = rgba(c1);
            const [r2, g2, b2] = rgba(c2);
            const r = Math.round(r1 * (1 - factor) + r2 * factor);
            const g = Math.round(g1 * (1 - factor) + g2 * factor);
            const b = Math.round(b1 * (1 - factor) + b2 * factor);
            return `rgb(${r},${g},${b})`;
          };
          return interpolate("rgba(53, 83, 132, 1)", "rgba(154, 218, 128, 1)", value);
        },
        borderWidth: 0,
        width: (ctx) => {
          const area = ctx.chart.chartArea;
          return area ? area.width / metals.length : 50;
        },
        height: (ctx) => {
          const area = ctx.chart.chartArea;
          return area ? area.height / metals.length : 50;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Correlation Matrix of Heavy Metals",
        font: { size: 18, weight: "bold" },
        color: "#111",
        padding: { bottom: 10 },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `Correlation: ${ctx.raw.v.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        type: "category",
        labels: metals,
        position: "top",
        grid: { display: false },
        offset: true, // ✅ shift ticks to align with boxes
        ticks: { color: "#000", font: { size: 13, weight: "500" } },
      },
      y: {
        type: "category",
        labels: metals.slice().reverse(),
        grid: { display: false },
        offset: true, // ✅ shift ticks to align with boxes
        ticks: { color: "#000", font: { size: 13, weight: "500" } },
      },
    },
    animation: {
      onComplete: function () {
        const chart = this;
        const ctx = chart.ctx;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#000";

        const area = chart.chartArea;
        const cellWidth = area.width / metals.length;
        const cellHeight = area.height / metals.length;

        chart.data.datasets.forEach((dataset) => {
          dataset.data.forEach((d) => {
            const xIndex = metals.indexOf(d.x);
            const yIndex = metals.indexOf(d.y);
            const x = area.left + cellWidth * xIndex + cellWidth / 2;
            const y = area.top + cellHeight * (metals.length - yIndex - 1) + cellHeight / 2; // y reversed
            ctx.font = "12px Arial";
            // ctx.fillStyle = "#fff";
            ctx.fillText(d.v.toFixed(2), x, y);
          });
        });
      },
    },
  };

  return (
    <div className="card" style={{ height: "500px", padding: "1rem 1.5rem 3.5rem 1.5rem" }}>
      <Chart type="matrix" data={data} options={options} />
      <div className="legend" style={{ textAlign: "center", marginTop: "10px" }}>
        <div
          style={{
            background:
              "linear-gradient(to right, rgba(53, 83, 132, 1), rgba(154, 218, 128, 1))",
            height: "12px",
            borderRadius: "6px",
            width: "70%",
            margin: "10px auto",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "70%",
            margin: "0 auto",
            color: "#444",
            fontSize: "13px",
          }}
        >
          <span>Low(0)</span>
          <span>Medium(0.5)</span>
          <span>High(1)</span>
        </div>
      </div>
    </div>
  );
};

export default CorrelationHeatmap;
