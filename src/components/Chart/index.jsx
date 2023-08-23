import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["CryptoBot", "Deposit", "API", "Balance"],
  datasets: [
    {
      label: "# of Votes",
      data: [70, 5, 10, 15],
      backgroundColor: ["#7B46E5", "#56FFEB", "#F05FFD", "#1DC74C"],
      borderWidth: 0,
    },
  ],
};
const options = {
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};
export default function Card() {
  return (
    <>
      <Doughnut data={data} options={options} width="100%" height="100%" />
    </>
  );
}