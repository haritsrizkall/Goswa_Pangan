"use client";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Dropdown({ label, items }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-gray-600 bg-gray-200 rounded-3xl text-sm px-4 py-2"
      >
        {label}
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute mt-2 w-35 bg-white border rounded-xl shadow-lg z-50 border-gray-300">
          <ul className="p-2 text-sm text-black font-medium">
            {items.map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="inline-flex items-center w-full p-2 hover:bg-gray-100 rounded"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
