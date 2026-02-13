"use client";
import Image from "next/image";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

export default function CardComplex({ img, title, price, button }) {
  return (
    <div className="w-70 max-w-sm bg-neutral-primary-soft p-6 border border-default rounded-3xl shadow-xs border-black">
      <a href="#">
        <Image
          className="rounded-base mb-6 items-center justify-center"
          width={200}
          height={120}
          src={img}
          alt="product image"
        />
      </a>
      <div>
        <h1 className="text-gray-500 font-medium text-[16px]">
          {title}
        </h1>

        <h5 className="text-[16px] text-black text-heading font-bold tracking-tight">
          {price}
        </h5>

        <div className="pt-5">
          <button
            type="button"
            className="inline-flex w-full justify-center items-center text-green-500 font-bold text-[15px] bg-green-400/15 hover:bg-brand-strong box-border rounded-3xl border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
          >
            <ArrowDownIcon className="w-4 h-4 me-1.5" />
            {button}
          </button>
        </div>
      </div>
    </div>
  );
}
