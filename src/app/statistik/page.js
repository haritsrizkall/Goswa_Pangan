"use-client";
import Dropdown from "../components/Dropdown";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Tabel from "../components/Tabel";
import Grafik from "../components/Grafik";

export default function Statistik() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 pt-16.75">
          <div className="text-center pt-16.75">
            <h1 className="text-[40px] font-semibold text-black">
              Harga Komoditas
            </h1>
            <p className="text-[15px] font-medium text-black pt-0.5 pb-8 px-4 md:px-0">
              Harga rata-rata dibandingkan dengan hari sebelumnya 08 Feb 2026
            </p>

            <ul className="flex flex-col md:flex-col lg:flex-row items-stretch lg:items-center justify-center w-full mt-3 sm:mt-0 text-center text-sm font-medium text-body gap-4 lg:gap-8">
              <Dropdown
                label="Per Pasar"
                items={["Per Pasar", "Per Komoditas"]}
              />

              <Dropdown
                label="Pasar Marona"
                items={["Pasar Marona", "Pasar Apa Ya?"]}
              />

              <button className="w-full lg:w-auto text-gray-600 bg-gray-200 border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-3xl text-sm px-4 py-2 focus:outline-none">
                2026-02
              </button>

              <button className="w-full lg:w-auto flex justify-center gap-2 text-gray-600 bg-gray-200 border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-3xl text-sm px-4 py-2 focus:outline-none">
                Unduh
                <ArrowDownTrayIcon className="w-4 h-4" />
              </button>
            </ul>
          </div>

          <div className="pt-20 px-6 md:px-8 lg:px-20 xl:px-30">
            <h1 className="text-center text-black text-[17px] font-black pb-7">
              Pasar Saroha bulan februari 2026
            </h1>
            <Grafik />
          </div>

          <div className="pt-12 px-6 md:px-8 lg:px-20 xl:px-30 pb-20">
            <Tabel />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
