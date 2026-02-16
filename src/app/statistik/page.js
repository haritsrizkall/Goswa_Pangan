"use client";
import Dropdown from "../components/Dropdown";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Tabel from "../components/Tabel";
import Grafik from "../components/Grafik";
import { useEffect, useState } from "react";
import {
  fetchGrafikKomoditas,
  fetchGrafikPasar,
  fetchKomoditas,
  fetchPasar,
  fetchTabelPerKomoditas,
  fetchTabelPerPasar,
} from "@/lib/api";

export default function Statistik() {
  const [pasar, setPasar] = useState([]);
  const [komoditas, setKomoditas] = useState([]);

  const [mode, setMode] = useState("Per Pasar");
  const [selectedPasar, setSelectedPasar] = useState(null);
  const [selectedKomoditas, setSelectedKomoditas] = useState(null);
  const [selectedBulanTahun, setSelectedBulanTahun] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  const [dataGrafik, setDataGrafik] = useState([]);
  const [dataTabel, setDataTabel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPasar()
      .then((res) => {
        setPasar(res.data ?? res);
        setSelectedPasar(res.data?.[0]?.id ?? res[0]?.id ?? null);
      })
      .catch((err) => setError(err.message));

    fetchKomoditas()
      .then((res) => {
        setKomoditas(res.data ?? res);
        setSelectedKomoditas(res.data?.[0]?.id ?? res[0]?.id ?? null);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!selectedBulanTahun) return;

    const [tahun, bulan] = selectedBulanTahun.split("-");

    if (mode === "Per Pasar" && !selectedPasar) return;
    if (mode === "Per Komoditas" && !selectedKomoditas) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError(null);

    const fetchGrafik =
      mode === "Per Pasar"
        ? fetchGrafikPasar(selectedPasar, bulan, tahun)
        : fetchGrafikKomoditas(selectedKomoditas, bulan, tahun);

    const fetchTabel =
      mode === "Per Pasar"
        ? fetchTabelPerPasar(selectedPasar, bulan, tahun)
        : fetchTabelPerKomoditas(selectedKomoditas, bulan, tahun);

    Promise.all([fetchGrafik, fetchTabel])
      .then(([grafik, tabel]) => {
        setDataGrafik(grafik.data ?? grafik);
        setDataTabel(tabel.data ?? tabel);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [mode, selectedPasar, selectedKomoditas, selectedBulanTahun]);

  const labelAktif =
    mode === "Per Pasar"
      ? (pasar.find((p) => p.id === selectedPasar)?.nama ?? "...")
      : (komoditas.find((k) => k.id === selectedKomoditas)?.nama_komoditas ??
        "...");

  const [tahun, bulan] = selectedBulanTahun.split("-");
  const namaBulan = new Date(tahun, bulan - 1).toLocaleString("id-ID", {
    month: "long",
  });

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
                label={mode}
                items={["Per Pasar", "Per Komoditas"]}
                onSelect={(val) => setMode(val)}
              />

              {mode === "Per Pasar" ? (
                <Dropdown
                  label={
                    pasar.find((p) => p.id === selectedPasar)?.nama ??
                    "Pilih Pasar"
                  }
                  items={pasar.map((p) => p.nama)}
                  onSelect={(nama) => {
                    const item = pasar.find((p) => p.nama === nama); 
                    if (item) setSelectedPasar(item.id);
                  }}
                />
              ) : (
                <Dropdown
                  label={
                    komoditas.find((k) => k.id === selectedKomoditas)
                      ?.nama_komoditas ?? "Pilih Komoditas"
                  }
                  items={komoditas.map((k) => k.nama_komoditas)}
                  onSelect={(nama) => {
                    const item = komoditas.find(
                      (k) => k.nama_komoditas === nama,
                    ); 
                    if (item) setSelectedKomoditas(item.id);
                  }}
                />
              )}

              <input
                type="month"
                value={selectedBulanTahun}
                onChange={(e) => setSelectedBulanTahun(e.target.value)}
                className="w-full lg:w-auto text-gray-600 bg-gray-200 border border-transparent rounded-3xl text-sm px-4 py-2 focus:outline-none"
              />

              <button className="w-full lg:w-auto flex justify-center gap-2 text-gray-600 bg-gray-200 border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-3xl text-sm px-4 py-2 focus:outline-none">
                Unduh
                <ArrowDownTrayIcon className="w-4 h-4" />
              </button>
            </ul>
          </div>

          {error && (
            <p className="text-center text-red-500 mt-6">
              Gagal memuat data: {error}
            </p>
          )}

          <div className="pt-20 px-6 md:px-8 lg:px-20 xl:px-30">
            <h1 className="text-center text-black text-[17px] font-black pb-7">
              {labelAktif} bulan {namaBulan} {tahun}
            </h1>
            <Grafik data={dataGrafik} loading={loading} />
          </div>

          <div className="pt-12 px-6 md:px-8 lg:px-20 xl:px-30 pb-20">
            <Tabel
              data={dataTabel}
              mode={mode}
              bulan={bulan}
              tahun={tahun}
              loading={loading}
            />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
