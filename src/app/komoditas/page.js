"use client";

import { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import { fetchKomoditasByNama } from "@/lib/api";
import CardKomoditas from "@/components/CardKomoditas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Komoditas() {
  const [komoditas, setKomoditas] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [allNames, setAllNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchKomoditasByNama()
      .then((res) => {
        setKomoditas(res.data);
        const names = Array.from(
          new Set(res.data.map((k) => k.nama_komoditas))
        );
        setAllNames(names);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const suggestions = useMemo(() => {
    if (!search) return allNames;
    return allNames.filter((name) =>
      name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, allNames]);

  const handleSearch = () => {
    const results = komoditas.filter((k) =>
      k.nama_komoditas.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(results);
    setDropdownOpen(false);
  };

  const handleSelect = (name) => {
    setSearch(name);
    const results = komoditas.filter(
      (item) => item.nama_komoditas === name
    );
    setFiltered(results);
    setDropdownOpen(false);
  };

  const today = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Harga Komoditas
        </h1>
        <p className="text-muted-foreground mt-1 mb-8">
          Harga rata-rata dibandingkan dengan hari sebelumnya &mdash; {today}
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm mb-8">
          Gagal memuat data: {error}
        </div>
      )}

      {/* Search */}
      <div className="flex justify-center mb-10 relative">
        <div className="flex items-center gap-2 w-full max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Cari Komoditas"
              className="pl-9 rounded-full"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setDropdownOpen(true);
              }}
              onFocus={() => setDropdownOpen(true)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            {dropdownOpen && suggestions.length > 0 && (
              <div className="absolute top-full mt-1.5 left-0 right-0 bg-card border rounded-xl shadow-lg max-h-48 overflow-y-auto z-50">
                {suggestions.map((name, index) => (
                  <div
                    key={name + index}
                    className="px-4 py-2 hover:bg-accent cursor-pointer text-sm text-foreground"
                    onMouseDown={() => handleSelect(name)}
                  >
                    {name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button onClick={handleSearch} className="rounded-full">
            Cari
          </Button>
        </div>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-lg" />
          ))}
        </div>
      )}

      {/* Results */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <CardKomoditas
              key={item.id}
              price={item.price}
              pasar={item.nama_pasar}
              tipe={item.tipe}
              satuan={item.satuan}
            />
          ))}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && search && (
        <p className="text-center text-muted-foreground py-12">
          Tidak ada hasil untuk &ldquo;{search}&rdquo;. Pilih komoditas dari
          daftar atau coba kata kunci lain.
        </p>
      )}

      {!loading && !error && filtered.length === 0 && !search && (
        <p className="text-center text-muted-foreground py-12">
          Ketik nama komoditas di atas untuk melihat data harga.
        </p>
      )}
    </section>
  );
}
