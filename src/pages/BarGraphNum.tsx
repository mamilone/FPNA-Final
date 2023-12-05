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

const BarGraphNum = ({ datae, label }) => {
  console.log(datae, label, "Hellooo");
  if (datae[0] == undefined || null) return null;
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

export default memo(BarGraphNum);
