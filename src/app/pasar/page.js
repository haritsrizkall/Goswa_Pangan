"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardSimple from "../components/CardSimple";
import { useEffect, useState } from "react";
import { fetchPasar } from "@/lib/api";
import "../../app/custom.css";

export default function Pasar() {
  const [pasar, setPasar] = useState([]);

  useEffect(() => {
    fetchPasar()
      .then((res) => {
        console.log(res);
        setPasar(res.data);
      })
      .catch((err) => console.error(err));
  });

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 pt-16.75">
          <div className="container-text px-25 sm:px-15 md:px-20 pt-16.75">
            <h1 className="text-[40px] font-semibold text-black">Data Pasar</h1>
            <p className="text-[15px] font-medium text-black pt-0.5 pb-16.75 md:px-0">
              Data pasar yang berasa di kota Palas.
            </p>

            <div className="card-product flex flex-wrap gap-3">
              {pasar.map((item) => {
                return (
                  <CardSimple
                    key={item.id}
                    img={`/images/${item.product_photo}`}
                    title={item.nama}
                    sub={item.alamat}
                  />
                );
              })}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
