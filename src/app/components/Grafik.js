"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";

// Dynamic import chart, SSR off
const LineChart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Line),
  { ssr: false }
);

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Grafik() {
  const [data, setData] = useState(null);
  const [windowWidth, setWindowWidth] = useState(0); 
  const labels = Array.from({ length: 30 }, (_, i) => `Feb ${i + 1}`);

  // hanya jalankan di client setelah mount
  useEffect(() => {
    const generateData = () => {
      return {
        labels,
        datasets: [
          {
            label: "Income",
            data: labels.map(() => Math.floor(Math.random() * 1000) + 500),
            borderColor: "#3b82f6",
            backgroundColor: "#3b82f6",
            tension: 0.3,
          },
          {
            label: "Outcome",
            data: labels.map(() => Math.floor(Math.random() * 800) + 300),
            borderColor: "#ef4444",
            backgroundColor: "#ef4444",
            tension: 0.3,
          },
          {
            label: "Others",
            data: labels.map(() => Math.floor(Math.random() * 400) + 100),
            borderColor: "#facc15",
            backgroundColor: "#facc15",
            tension: 0.3,
          },
        ],
      };
    };

    // delay kecil untuk aman di hydration
    const timeout = setTimeout(() => setData(generateData()), 0);
    return () => clearTimeout(timeout);
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: "rect",
          boxWidth: 15,
        },
      },
      tooltip: { mode: "index", intersect: false },
    },
    interaction: { mode: "nearest", intersect: false },
    scales: {
      y: {
        title: { display: true, text: "Harga (IDR)" },
        beginAtZero: true,
      },
      x: { title: { display: true, text: "Tanggal" } },
    },
  };
  if (!data) return null; // sementara menunggu data siap

  return (
    <div className="w-full bg-neutral-primary-soft border border-black rounded-3xl shadow-xs p-4 md:p-6">
      <div className={windowWidth < 1024 ? "overflow-x-auto" : "overflow-x-visible"}>
        <div className="relative w-full lg:max-w-full" style={{ minWidth: window.innerWidth < 1024 ? labels.length * 60 : "100%", height: 500 }}>
          <LineChart data={data} options={options} height={100} />
        </div>
      </div>
    </div>
  );
}