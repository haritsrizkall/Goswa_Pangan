"use client";

import { useEffect, useState } from "react";
import { fetchKomoditas } from "@/lib/api";
import HeroSection from "@/components/HeroSection";
import CardComplex from "@/components/CardComplex";
import CommodityCardSkeleton from "@/components/CommodityCardSkeleton";

export default function Home() {
  const [komoditas, setKomoditas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchKomoditas()
      .then((res) => setKomoditas(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const today = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <HeroSection />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Harga rata-rata komoditas hari ini
        </h2>
        <p className="text-muted-foreground mt-1 mb-8">
          Harga dibandingkan dengan hari sebelumnya &mdash; {today}
        </p>

        {error && (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm mb-8">
            Gagal memuat data: {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <CommodityCardSkeleton key={i} />
              ))
            : komoditas.map((item) => (
                <CardComplex key={item.id} item={item} />
              ))}
        </div>

        {!loading && !error && komoditas.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            Tidak ada data komoditas tersedia.
          </p>
        )}
      </section>
    </>
  );
}
