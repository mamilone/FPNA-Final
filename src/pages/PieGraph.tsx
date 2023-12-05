import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieGraph = ({ datae }) => {
  if (datae[0] == undefined || null) return null;
  if (datae[0]?.includes("%")) {
    datae?.forEach((element, index) => {
      datae[index] = Number(element.split("%")[0]);
    });
    //check, remove and convert the string in array to numbers - "$43" -> 43
    //required for graph input
  }

  const data = {
    labels: [
      "Floating APR Summary",
      "Fixed APR Summary",
      "Promo APR Summary",
      "Transactors Summary",
    ],
    datasets: [
      {
        data: datae,
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
      },
    ],
  };

  const options = {};

  return <Pie data={data} options={options} />;
};
