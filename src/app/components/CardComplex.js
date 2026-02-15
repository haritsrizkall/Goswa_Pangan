"use client";
import Image from "next/image";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import "../../app/custom.css";

export default function CardComplex({ img, title, price, button, isDown }) {
  return (
    <div className="">
      <div className="card w-full sm:w-80 md:w-60 bg-neutral-primary-soft p-6 border border-default rounded-3xl shadow-xs border-black">
        <a href="#">
          <div className="image relative w-50 h-30 mb-6 rounded-base overflow-hidden">
            <Image
              src={img}
              alt="product image"
              fill
              className="object-contain"
            />
          </div>
        </a>
        <div>
          <h1 className="text-gray-500 font-medium text-[16px]">{title}</h1>

          <h5 className="text-[16px] text-black text-heading font-bold tracking-tight">
            {price}
          </h5>

          <div className="pt-5">
            <button
              type="button"
              className={`inline-flex w-full justify-center items-center font-bold text-[15px] box-border rounded-3xl border border-transparent focus:ring-4 focus:outline-none shadow-xs leading-5 px-3 py-2 ${
                isDown
                  ? "text-red-500 bg-red-400/15 hover:bg-red-500/20 focus:ring-red-400"
                  : "text-green-500 bg-green-400/15 hover:bg-brand-strong focus:ring-brand-medium"
              }`}
            >
              <ArrowDownIcon className="w-4 h-4 me-1.5" />
              {button}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
