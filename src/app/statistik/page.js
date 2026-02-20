"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import {
  fetchGrafikKomoditas,
  fetchGrafikPasar,
  fetchKomoditas,
  fetchPasar,
  fetchTabelPerKomoditas,
  fetchTabelPerPasar,
} from "@/lib/api";
import Grafik from "@/components/Grafik";
import Tabel from "@/components/Tabel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

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

  const today = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Statistik Harga Komoditas
        </h1>
        <p className="text-muted-foreground mt-1">
          Harga rata-rata dibandingkan dengan hari sebelumnya &mdash; {today}
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-center gap-3 mb-8">
        <Tabs
          value={mode}
          onValueChange={setMode}
          className="w-full lg:w-auto"
        >
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger value="Per Pasar">Per Pasar</TabsTrigger>
            <TabsTrigger value="Per Komoditas">Per Komoditas</TabsTrigger>
          </TabsList>
        </Tabs>

        {mode === "Per Pasar" ? (
          <Select
            value={selectedPasar != null ? String(selectedPasar) : undefined}
            onValueChange={(val) => setSelectedPasar(Number(val))}
          >
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Pilih Pasar" />
            </SelectTrigger>
            <SelectContent>
              {pasar.map((p) => (
                <SelectItem key={p.id} value={String(p.id)}>
                  {p.nama}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Select
            value={
              selectedKomoditas != null ? String(selectedKomoditas) : undefined
            }
            onValueChange={(val) => setSelectedKomoditas(Number(val))}
          >
            <SelectTrigger className="w-full lg:w-48">
              <SelectValue placeholder="Pilih Komoditas" />
            </SelectTrigger>
            <SelectContent>
              {komoditas.map((k) => (
                <SelectItem key={k.id} value={String(k.id)}>
                  {k.nama_komoditas}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <input
          type="month"
          value={selectedBulanTahun}
          onChange={(e) => setSelectedBulanTahun(e.target.value)}
          className="h-9 w-full lg:w-auto rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />

        {/* <Button variant="outline" className="w-full lg:w-auto gap-2">
          <Download className="h-4 w-4" />
          Unduh
        </Button> */}
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm mb-8">
          Gagal memuat data: {error}
        </div>
      )}

      {/* Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-center text-base">
            {labelAktif} bulan {namaBulan} {tahun}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-[500px] w-full" />
          ) : (
            <Grafik data={dataGrafik} loading={false} mode={mode} />
          )}
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tabel Harga</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <Tabel
              data={dataTabel}
              mode={mode}
              bulan={bulan}
              tahun={tahun}
              loading={false}
            />
          )}
        </CardContent>
      </Card>
    </section>
  );
}
