"use client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CardComplex from "./components/CardComplex";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 pt-16.75">
          <div className="pl-25 pr-25 pt-16.75">
            <h1 className="text-[40px] font-semibold text-black">
              Harga rata-rata komoditas hari ini di Palas
            </h1>
            <p className="text-[15px] font-medium text-black pt-0.5 pb-16.75 md:px-0">
              Harga dibandingkan dengan hari sebelumnya 08 Feb 2026
            </p>

            <CardComplex 
            img="/images/cabai.png"
            title="Cabe Rawit Merah"
            price="Rp. 86.905/kg"
            button="Turun Rp. 2.000"
            />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
