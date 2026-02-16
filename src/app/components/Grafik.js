"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";

const LineChart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Line),
  { ssr: false },
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const COLORS = [
  "#3b82f6",
  "#ef4444",
  "#facc15",
  "#22c55e",
  "#a855f7",
  "#f97316",
  "#06b6d4",
  "#ec4899",
];

export default function Grafik({ data = [], loading, mode }) {
  const [chartData, setChartData] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !data.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setChartData(null);
      return;
    }

    const tanggalSet = new Set();
    data.forEach((item) => {
      item.data_harian?.forEach((d) => tanggalSet.add(d.tanggal));
    });
    const sortedTanggal = [...tanggalSet].sort();

    const labels = sortedTanggal.map((t) =>
      String(new Date(t).getUTCDate()).padStart(2, "0"),
    );

    const datasets = data.map((item, i) => ({
      label:
        mode === "Per Pasar"
          ? (item.nama_komoditas ?? `Komoditas ${i + 1}`)
          : (item.nama_pasar ?? `Pasar ${i + 1}`),
      data: sortedTanggal.map((tgl) => {
        const found = item.data_harian?.find((d) => d.tanggal === tgl);
        return found ? Math.round(Number(found.rata_harga)) : null;
      }),
      borderColor: COLORS[i % COLORS.length],
      backgroundColor: COLORS[i % COLORS.length],
      tension: 0.3,
      spanGaps: false,
      pointRadius: 4,
      pointHoverRadius: 6,
    }));

    setChartData({ labels, datasets });
  }, [data, mode, mounted]);

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
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (ctx) =>
            `${ctx.dataset.label}: Rp. ${Number(ctx.raw).toLocaleString("id-ID")}`,
        },
      },
    },
    interaction: { mode: "nearest", intersect: false },
    scales: {
      y: {
        title: { display: true, text: "Harga (IDR)" },
        beginAtZero: false,
        ticks: {
          callback: (val) => `Rp. ${Number(val).toLocaleString("id-ID")}`,
        },
      },
      x: { title: { display: true, text: "Tanggal" } },
    },
  };

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="w-full bg-neutral-primary-soft border border-black rounded-3xl shadow-xs p-4 md:p-6 flex items-center justify-center h-125">
        <p className="text-gray-500">Memuat grafik...</p>
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className="w-full bg-neutral-primary-soft border border-black rounded-3xl shadow-xs p-4 md:p-6 flex items-center justify-center h-125">
        <p className="text-gray-400">Tidak ada data grafik.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-neutral-primary-soft border border-black rounded-3xl shadow-xs p-4 md:p-6">
      <div className="overflow-x-auto lg:overflow-x-visible">
        <div
          className="relative w-full"
          style={{
            minWidth:
              chartData.labels.length > 15
                ? chartData.labels.length * 60
                : "100%",
            height: 500,
          }}
        >
          <LineChart data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
}
