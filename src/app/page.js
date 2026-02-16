"use client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CardComplex from "./components/CardComplex";
import { useEffect, useState } from "react";
import { fetchKomoditas } from "@/lib/api";
import "./custom.css";

export default function Home() {
  const [komoditas, setKomoditas] = useState([]);

  useEffect(() => {
    fetchKomoditas()
      .then((res) => {
        setKomoditas(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 pt-16.75">
          <div className="container-text px-25 sm:px-15 md:px-20 pt-16.75">
            <h1 className="text-[40px] font-semibold text-black">
              Harga rata-rata komoditas hari ini di Palas
            </h1>
            <p className="text-[15px] font-medium text-black pt-0.5 pb-16.75 md:px-0">
              Harga dibandingkan dengan hari sebelumnya 08 Feb 2026
            </p>

            <div className="card-product flex flex-wrap gap-2.5">
              {komoditas.map((item) => {
                const harga = Number(item.harga_hari_ini || 0);
                const selisih = Number(item.selisih || 0);

                return (
                  <CardComplex
                    key={item.id}
                    img={`/images/${item.product_photo}`}
                    title={item.nama_komoditas}
                    price={`Rp ${harga.toLocaleString()}/${item.satuan}`}
                    button={
                      selisih > 0
                        ? `Naik Rp ${Math.abs(selisih).toLocaleString()}`
                        : selisih < 0
                          ? `Turun Rp ${Math.abs(selisih).toLocaleString()}`
                          : "Stabil"
                    }
                    isDown={selisih < 0}
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
