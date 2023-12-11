import React, { memo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieGraph = ({ datae }) => {
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

  const option = {
    plugins: {
      datalabels: {
        color: "#000000",
        font: {
          size: 20,
          weight: 600,
        },
      },
    },
  };

  return <Pie options={option} data={data} />;
};

export default memo(PieGraph);
