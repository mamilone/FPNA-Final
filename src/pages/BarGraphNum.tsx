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

const NumberFormat = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "decimal",
  }).format(value);

const BarGraphNum = ({ datae, label }) => {
  if (datae[0] == undefined || null) return null;
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
        formatter: function (value, context) {
          return NumberFormat(value);
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

export default memo(BarGraphNum);
