"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardSimple from "../components/CardSimple";

export default function Pasar() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 pt-16.75">
          <div className="pl-25 pr-25 pt-16.75">
            <h1 className="text-[40px] font-semibold text-black">Data Pasar</h1>
            <p className="text-[15px] font-medium text-black pt-0.5 pb-16.75 md:px-0">
              Data pasar yang berasa di kota Palas.
            </p>
\
            <CardSimple
              img="/images/pasar.png"
              title="Pasar Maronan"
              sub="Jl. Siak 2, Rumbai Bukit, Kec. Rumbai, Kota Pekanbaru, Riau
                28265"
            />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
