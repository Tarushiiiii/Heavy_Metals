import React from "react";
import { Bar } from "react-chartjs-2";


export const ResultStandardsChart = () => {
const data = {
labels: ["Pb", "Cd", "Cr", "Ni", "Zn"],
datasets: [
{
label: "Observed (µg/L)",
data: [8.5, 3.2, 6.1, 4.8, 10.0],
backgroundColor: "rgba(0, 117, 121, 0.8)",
},
{
label: "Permissible (µg/L)",
data: [10, 5, 10, 10, 15],
backgroundColor: "rgba(200, 200, 200, 0.8)",
},
],
};


const options = {
indexAxis: "y",
responsive: true,
plugins: {
legend: { position: "bottom" },
title: {
display: true,
text: "Observed vs Standards",
},
},
scales: {
x: { beginAtZero: true },
},
};


return <Bar data={data} options={options} />;
};
export default ResultStandardsChart;