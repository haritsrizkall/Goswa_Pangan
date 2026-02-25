"use client";

import { useEffect, useState } from "react";
import { fetchPasar } from "@/lib/api";
import CardSimple from "@/components/CardSimple";
import MarketCardSkeleton from "@/components/MarketCardSkeleton";

export default function Pasar() {
  const [pasar, setPasar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPasar()
      .then((res) => setPasar(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">
        Data Pasar
      </h1>
      <p className="text-muted-foreground mt-1 mb-8">
        Data pasar yang berada di Kota Palas.
      </p>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm mb-8">
          Gagal memuat data: {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <MarketCardSkeleton key={i} />
            ))
          : pasar.map((item) => (
              <CardSimple
                key={item.id}
                img={item.product_photo}
                title={item.nama}
                sub={item.alamat}
              />
            ))}
      </div>

      {!loading && !error && pasar.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          Tidak ada data pasar tersedia.
        </p>
      )}
    </section>
  );
}
