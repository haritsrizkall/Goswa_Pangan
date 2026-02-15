"use client";
import { useState, useEffect } from "react";
import CardKomoditas from "../components/CardKomoditas";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { fetchKomoditasByNama } from "@/lib/api";

export default function Komoditas() {
  const [komoditas, setKomoditas] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownData, setDropdownData] = useState([]);

  useEffect(() => {
    fetchKomoditasByNama()
      .then((res) => {
        console.log(res);
        setKomoditas(res.data);

        const names = Array.from(
          new Set(res.data.map((k) => k.nama_komoditas)),
        );
        setDropdownData(names);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 pt-16.75">
          <div className="text-center container-text px-25 sm:px-15 md:px-20 pt-16.75">
            <h1 className="text-[40px] font-semibold text-black">
              Harga Komoditas
            </h1>
            <p className="text-[15px] font-medium text-black pt-0.5 pb-8 px-4 md:px-0">
              Harga rata-rata dibandingkan dengan hari sebelumnya 08 Feb 2026
            </p>

            <div className="flex justify-center relative">
              <div className="flex items-center bg-gray-200 rounded-full px-4 py-2 w-87.5">
                <svg
                  className="w-5 h-5 text-gray-500 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>

                <input
                  type="text"
                  placeholder="Cari Komoditas"
                  className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    // const filtered = komoditas.filter((k) =>
                    //   k.nama_komoditas
                    //     .toLowerCase()
                    //     .includes(e.target.value.toLowerCase()),
                    // );
                    const filteredNames = dropdownData.filter((name) =>
                      name.toLowerCase().includes(e.target.value.toLowerCase()),
                    );
                    setDropdownData(filteredNames);
                    setDropdownOpen(true);
                  }}
                  onFocus={() => {
                    // setDropdownData(komoditas);
                    setDropdownOpen(true);
                  }}
                  onBlur={() => setTimeout(() => setDropdownOpen(false), 200)} // delay biar bisa klik
                />

                <button
                  className="ml-10 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-1 rounded-full"
                  onClick={() => {
                    const results = komoditas.filter((k) =>
                      name.toLowerCase().includes(search.toLowerCase()),
                    );
                    setFiltered(results);
                  }}
                >
                  Cari
                </button>
              </div>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute top-full mt-1.5 text-black text-start bg-white border border-gray-300 rounded-xl shadow-md max-h-35 w-80 overflow-y-auto z-50">
                  {dropdownData.map((name, index) => (
                    <div
                      key={name + index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onMouseDown={() => {
                        setSearch(name);
                        const results = komoditas.filter(
                          (item) => item.nama_komoditas === name,
                        );
                        setFiltered(results);
                        setDropdownOpen(false);
                      }}
                    >
                      {name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div
              className="card-product grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-15 max-h-[70vh] overflow-y-auto"
            >
              {filtered.map((item) => {
                return (
                  <CardKomoditas
                    key={item.id}
                    price={item.price}
                    pasar={item.nama_pasar}
                    tipe={item.tipe}
                    satuan={item.satuan}
                  />
                );
              })}
            </div>
          </div>
        </main>

        <div className="pt-15">
          <Footer />
        </div>
      </div>
    </>
  );
}
