// src/components/advanced/CompositeIndexChart.jsx
import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
);

const CompositeIndexChart = () => {
  const data = {
    labels: ["HPI", "HEI", "MI", "Cd"],
    datasets: [
      {
        label: "Site 1",
        data: [65, 40, 55, 10],
        backgroundColor: "rgba(53, 83, 132, 0.2)",
        borderColor: "rgba(53, 83, 132, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(53, 83, 132, 1)",
      },
      {
        label: "Site 2",
        data: [80, 45, 60, 20],
        backgroundColor: "rgba(42, 185, 122, 0.2)",
        borderColor: "rgba(42, 185, 122, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(42, 185, 122, 1)",
      },
      {
        label: "Site 3",
        data: [70, 50, 58, 15],
        backgroundColor: "rgba(154, 218, 128, 0.2)",
        borderColor: "rgba(154, 218, 128, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(154, 218, 128, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 13 },
          color: "#000",
        },
      },
      title: {
        display: true,
        text: "Composite Index Comparison (HPI, HEI, MI, Cd)",
        font: { size: 18, weight: "bold" },
        color: "#111",
        padding: { bottom: 10 },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          color: "#444",
        },
        pointLabels: {
          color: "#111",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        grid: {
          color: "rgba(0,0,0,0.1)",
        },
        angleLines: {
          color: "rgba(0,0,0,0.1)",
        },
      },
    },
  };

  return (
    <div className="graph-card" style={{ height: "400px", padding: "1rem" }}>
      <Radar data={data} options={options} />
    </div>
  );
};

export default CompositeIndexChart;
