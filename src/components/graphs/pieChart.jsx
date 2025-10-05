import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);
import pieData from "./pieData.js";

const PieChart = () => {
  const chartData = {
    labels: pieData.map((data) => data.label),
    datasets: [
      {
        label: "Percentage",
        data: pieData.map((data) => data.value),
        backgroundColor: [
          "rgb(46, 184, 122)",
          "rgb(53, 83, 133)",
          "rgba(225, 255, 187, 1)",
          "rgb(0, 90, 157)",
          "rgba(20, 61, 96, 1)",
          "rgb(0, 117, 121)",
          "rgba(160, 200, 120, 1)",
        ],
        borderColor: "white",
        borderWidth: 2,
        hoverOffset: 15,
        hoverBorderColor: "white",
      },
    ],
  };

  const options = {
    responsive: true,
    layout: {
      padding: {
        right: 0,
        top: 16,
        left: 10,
      },
    },
    plugins: {
      legend: {
        fullSize: false,
        align: "end",
        position: "right",
        title: {
          display: true,
          text: "Legend",
          color: "black",
          font: {
            size: 15,
          },
          padding: {
            top: 0,
            bottom: 3,
          },
        },
        labels: {
          boxWidth: 20,
          boxHeight: 15,
          padding: 6,
          font: {
            size: 12,
          },
          color: "black",
        },
      },
      title: {
        display: true,
        text: "Heavy Metal Composition",
        color: "black",
        font: {
          size: 22,
          weight: "530",
        },
      },
    },
  };

  return (
    <div className="graph-card">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
