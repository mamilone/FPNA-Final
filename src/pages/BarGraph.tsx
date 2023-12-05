import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import React, { useState, memo } from "react";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

const BarGraph = ({ datae, label }) => {
  console.log(datae, label);
  if (datae[0] == undefined || null) return null;
  if (datae[0]?.includes("$")) {
    datae?.forEach((element: string, index: string | number) => {
      datae[index] = Number(element.split("$")[1]);
    });
    //check, remove and convert the string in array to numbers - "$43" -> 43
    //required for graph input
  } else if (datae[0]?.includes("%")) {
    datae?.forEach((element: string, index: string | number) => {
      datae[index] = Number(element.split("%")[0]);
    });
  }
  console.log(datae, label, "Helloo");
  const option = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 18,
          },
        },
      },
      ChartDataLabels,
    },
    // scales: {
    //   y: {
    //     ticks: {
    //       // Include a dollar sign in the ticks
    //       callback: function (value, index, ticks) {
    //         console.log("value", value, "ticks", ticks);
    //         return value;
    //       },
    //     },
    //   },
    // },
  };

  const data = {
    labels: ["baseline", "year 1", "year 2", "year 3"],
    datasets: [
      {
        label: label,
        data: datae,
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
    ],
  };

  return (
    <Bar
      options={option}
      data={data}
      style={{ margin: "80pt" }}
      height={"30%"}
      width={"30%"}
    />
  );
};

export default memo(BarGraph);
