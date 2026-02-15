"use client";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  StopCircleIcon,
} from "@heroicons/react/24/outline";
import "../../app/custom.css";

export default function CardKomoditas({ pasar, price, tipe, satuan }) {
  let bgColor = "";
  let Icon = null;
  let text = "";

  if (tipe === "Tertinggi") {
    bgColor = "bg-green-600";
    Icon = ArrowUpIcon;
    text = "Harga Tertinggi";
  } else if (tipe === "Terendah") {
    bgColor = "bg-red-700";
    Icon = ArrowDownIcon;
    text = "Harga Terendah";
  } else {
    bgColor = "bg-blue-600";
    Icon = StopCircleIcon;
    text = "Harga Rata-Rata";
  }

  return (
    <div className="card w-full bg-neutral-primary-soft p-6 border border-default rounded-3xl shadow-xs border-black flex flex-col justify-center items-center">
      <h1 className="text-black font-bold text-[28px] text-center">
        Rp {Number(price).toLocaleString()}/{satuan}
      </h1>

      <h5 className="text-[16px] text-black text-heading font-medium tracking-tight text-center pt-1.5">
        {pasar}
      </h5>

      <div
        className={`inline-flex w-full justify-center items-center font-bold text-[15px] rounded-3xl text-white px-3 py-2 mt-3 ${bgColor}`}
      >
        {Icon && <Icon className="w-4 h-4 me-1.5" />}
        {text}
      </div>
    </div>
  );
}
