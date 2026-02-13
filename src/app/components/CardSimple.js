"use client";
import Image from "next/image";
import { MapPinIcon } from "@heroicons/react/24/outline";

export default function CardSimple({ img, title, sub }) {
  return (
    <div className="bg-neutral-primary-soft block max-w-70 p-2 border border-black rounded-3xl shadow-xs">
      <a href="#">
        <Image
          className="h-45.75 mb-3 items-center justify-center rounded-3xl"
          width={263}
          height={183}
          src={img}
          alt="product image"
        />
      </a>
      <a href="#">
        <h5>{title}</h5>
      </a>

      <span className="inline-flex items-center text-xs text-gray-500 font-medium rounded-sm">
        <MapPinIcon className="w-7 h-7 me-1.5" />
        {sub}
      </span>
    </div>
  );
}
