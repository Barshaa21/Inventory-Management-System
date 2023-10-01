import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "",
    },
  },
};

const labels = ["Laptop", "Charger", "Mouse", "Pendrive", "Router", "Monitor"];

export const data = {
  labels,
  datasets: [
    {
      label: "Products Quantity",
      data: [30, 5, 30, 20, 40, 55],
      backgroundColor: "rgba(0,255,255,0.4)",
    },
    {
      label: "No of orders",
      data: [10, 35, 10, 25, 20, 35],
      backgroundColor: "rgba(128, 0, 128, 0.3)",
    },
  ],
};

export function BubbleChart() {
  return <Bar className="" options={options} data={data} />;
}
