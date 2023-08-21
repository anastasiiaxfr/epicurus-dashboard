import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
   
  scales: {
    x: {
      type: 'category',
      labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    },
    y: {
      beginAtZero: true,
    },
  },
};

export const data = {

  datasets: [
    {
      fill: true,
      label: "Income",
      data: [100, 200, 300, 250, 150, 400, 350, 100, 200, 300, 250, 150],
      backgroundColor: "rgba(123,70,229,0.2)",
      borderColor: "rgba(123,70,229,1)",
    },
  ],
};

const AreaChart = () => {
  return <Line data={data} options={options} />;
};

export default AreaChart;
