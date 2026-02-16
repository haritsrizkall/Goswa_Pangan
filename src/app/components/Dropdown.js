"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Dropdown({ label, items, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-gray-600 bg-gray-200 rounded-3xl text-sm px-4 py-2"
      >
        {label}
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute mt-2 w-35 bg-white border rounded-xl shadow-lg z-50 border-gray-300">
          <ul className="p-2 text-sm text-black font-medium">
            {items.map((item, i) => (
              <li key={i}>
                <button
                  type="button"
                  className="inline-flex items-center w-full p-2 hover:bg-gray-100 rounded text-left"
                  onClick={() => {
                    onSelect?.(item); 
                    setOpen(false); 
                  }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
