import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import React, { memo } from "react";

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
  if (datae[0] == undefined || null) return null;
  //check, remove and convert the string in array to numbers - "43%" -> 43
  //required for graph input
  if (datae[0]?.includes("%")) {
    datae?.forEach((element: string, index: string | number) => {
      datae[index] = Number(element.split("%")[0]);
    });
  }
  const option = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 25,
          },
        },
      },
      ChartDataLabels,
      datalabels: {
        color: "#000000",
        font: {
          size: 20,
          weight: 600,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 20,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 20,
          },
        },
      },
    },
  };

  const data = {
    labels: ["Baseline", "year 1", "year 2", "year 3"],
    datasets: [
      {
        label: label,
        data: datae,
        backgroundColor: "rgba(44, 152, 245, 0.9)",
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
