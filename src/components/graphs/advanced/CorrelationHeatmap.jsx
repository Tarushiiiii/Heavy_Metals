import React from "react";
import { Chart as ChartJS, Tooltip, Legend, Title, LinearScale } from "chart.js";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import { Chart } from "react-chartjs-2";

ChartJS.register(MatrixController, MatrixElement, Tooltip, Legend, Title, LinearScale);

const metals = ["Cd", "Pb", "As", "Cr", "Ni", "Cu", "Zn", "Fe", "Mn"];

// Sample correlation data from -1 to +1
const correlations = [
  [1, 0.8, -0.5, 0.2, 0.7, -0.3, 0.6, -0.6, 0.9],
  [0.8, 1, -0.4, 0.3, 0.6, -0.2, 0.7, -0.5, 0.85],
  [-0.5, -0.4, 1, -0.7, -0.2, 0.5, -0.3, 0.6, -0.1],
  [0.2, 0.3, -0.7, 1, 0.5, -0.4, 0.2, -0.3, 0.6],
  [0.7, 0.6, -0.2, 0.5, 1, -0.1, 0.8, -0.2, 0.7],
  [-0.3, -0.2, 0.5, -0.4, -0.1, 1, -0.5, 0.3, -0.6],
  [0.6, 0.7, -0.3, 0.2, 0.8, -0.5, 1, -0.4, 0.7],
  [-0.6, -0.5, 0.6, -0.3, -0.2, 0.3, -0.4, 1, -0.5],
  [0.9, 0.85, -0.1, 0.6, 0.7, -0.6, 0.7, -0.5, 1],
];

// Function to interpolate color based on correlation
const interpolateColor = (value) => {
  // value: -1 -> +1
  const rgb = (c) => c.match(/\d+/g).map(Number);
  const deepBlue = [53, 83, 132]; // -1
  const green = [42, 185, 122];   // 0
  const lightGreen = [154, 218, 128]; // +1

  // Normalize value from -1..+1 to 0..1
  const t = (value + 1) / 2;

  let r, g, b;

  if (t <= 0.5) {
    // interpolate between deepBlue and green
    const factor = t / 0.5; // 0 -> 0, 0.5 -> 1
    r = Math.round(deepBlue[0] * (1 - factor) + green[0] * factor);
    g = Math.round(deepBlue[1] * (1 - factor) + green[1] * factor);
    b = Math.round(deepBlue[2] * (1 - factor) + green[2] * factor);
  } else {
    // interpolate between green and lightGreen
    const factor = (t - 0.5) / 0.5; // 0.5 -> 0, 1 -> 1
    r = Math.round(green[0] * (1 - factor) + lightGreen[0] * factor);
    g = Math.round(green[1] * (1 - factor) + lightGreen[1] * factor);
    b = Math.round(green[2] * (1 - factor) + lightGreen[2] * factor);
  }

  return `rgb(${r},${g},${b})`;
};

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
        backgroundColor: (ctx) => interpolateColor(ctx.raw.v),
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
        padding: { bottom: 4 },
      },
      subtitle: {
        display: true,
        text:
          "Visualizing relationships between metals to identify possible shared contamination sources.",
        font: { size: 14, weight: "400" },
        color: "#555",
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
        offset: true,
        ticks: { color: "#000", font: { size: 13, weight: "500" } },
      },
      y: {
        type: "category",
        labels: metals.slice().reverse(),
        grid: { display: false },
        offset: true,
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
            const y =
              area.top + cellHeight * (metals.length - yIndex - 1) + cellHeight / 2;
            ctx.font = "12px Arial";
            ctx.fillText(d.v.toFixed(2), x, y);
          });
        });
      },
    },
  };

  return (
    <div
      className="graph-card"
      style={{ height: "600px", padding: "1.5rem 1.5rem 4rem 1.5rem" }}
    >
      <Chart type="matrix" data={data} options={options} />
      <div className="legend" style={{ textAlign: "center", marginTop: "10px" }}>
        <div
          style={{
            background:
              "linear-gradient(to right, rgba(53,83,132,1), rgba(42,185,122,1), rgba(154,218,128,1))",
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
          <span>Low(-1)</span>
          <span>Moderate(0)</span>
          <span>High(+1)</span>
        </div>
      </div>
    </div>
  );
};

export default CorrelationHeatmap;
