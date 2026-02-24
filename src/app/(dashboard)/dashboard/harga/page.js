"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchPasar, fetchKomoditas } from "@/lib/api";
import Toast from "@/components/admin/Toast";
import { Save, ChevronLeft, ChevronRight } from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_API_URL;

function formatTanggal(dateStr) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Angka mentah (string digit) → "16.500"
function toDisplay(raw) {
  if (raw === "" || raw === null || raw === undefined) return "";
  const num = parseInt(raw.replace(/\D/g, ""), 10);
  if (isNaN(num)) return "";
  return num.toLocaleString("id-ID");
}

// "16.500" → "16500" (nilai mentah untuk disimpan)
function toRaw(display) {
  return display.replace(/\D/g, "");
}

export default function InputHargaPage() {
  const today = new Date().toISOString().slice(0, 10);

  const [tanggal, setTanggal] = useState(today);
  const [pasarList, setPasarList] = useState([]);
  const [komoditasList, setKomoditasList] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // grid[komoditas_id][pasar_id] = { raw: "16500", display: "16.500" }
  const [grid, setGrid] = useState({});
  const [dirtyKeys, setDirtyKeys] = useState(new Set());
  const [isPrefill, setIsPrefill] = useState(false); // harga terakhir, bukan data tanggal ini
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => setToast({ message, type });

  useEffect(() => {
    Promise.all([fetchPasar(), fetchKomoditas()])
      .then(([resPasar, resKom]) => {
        setPasarList(Array.isArray(resPasar?.data) ? resPasar.data : []);
        const all = Array.isArray(resKom?.data) ? resKom.data : [];
        setKomoditasList(all.filter((k) => k.status === 1));
      })
      .catch(() => showToast("Gagal memuat data", "error"))
      .finally(() => setDataLoading(false));
  }, []);

  const loadHargaTanggal = useCallback(async () => {
    if (!tanggal || komoditasList.length === 0) return;
    try {
      const res = await fetch(`${BASE}/api/harga/tanggal/${tanggal}`);
      const json = await res.json();
      const { rows = [], is_prefill = false } = json?.data || {};

      const newGrid = {};
      (Array.isArray(rows) ? rows : []).forEach(
        ({ komoditas_id, pasar_id, harga }) => {
          if (!newGrid[komoditas_id]) newGrid[komoditas_id] = {};
          const raw = String(parseInt(harga, 10));
          newGrid[komoditas_id][pasar_id] = { raw, display: toDisplay(raw) };
        },
      );
      setGrid(newGrid);
      setDirtyKeys(new Set());
      setIsPrefill(is_prefill);
    } catch (_) {
      setGrid({});
      setIsPrefill(false);
    }
  }, [tanggal, komoditasList]);

  useEffect(() => {
    loadHargaTanggal();
  }, [loadHargaTanggal]);

  const getCell = (komoditas_id, pasar_id) =>
    grid[komoditas_id]?.[pasar_id] ?? { raw: "", display: "" };

  const updateCell = (komoditas_id, pasar_id, displayValue) => {
    const raw = toRaw(displayValue);
    // Rebuild display dari raw supaya titik ribuan auto-format saat ketik
    const display = raw === "" ? "" : toDisplay(raw);
    const key = `${komoditas_id}:${pasar_id}`;
    setGrid((prev) => ({
      ...prev,
      [komoditas_id]: {
        ...(prev[komoditas_id] || {}),
        [pasar_id]: { raw, display },
      },
    }));
    setDirtyKeys((prev) => new Set(prev).add(key));
  };

  const handleSave = async () => {
    if (dirtyKeys.size === 0) {
      showToast("Tidak ada perubahan", "error");
      return;
    }
    setSaving(true);
    try {
      const byKomoditas = {};
      dirtyKeys.forEach((key) => {
        const [komoditas_id, pasar_id] = key.split(":");
        if (!byKomoditas[komoditas_id]) byKomoditas[komoditas_id] = [];
        const cell = grid[komoditas_id]?.[pasar_id];
        byKomoditas[komoditas_id].push({
          pasar_id: Number(pasar_id),
          harga: cell?.raw !== "" ? Number(cell.raw) : "",
        });
      });

      await Promise.all(
        Object.entries(byKomoditas).map(([komoditas_id, harga_list]) =>
          fetch(`${BASE}/api/harga/komoditas/${komoditas_id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tanggal, harga_list }),
          }),
        ),
      );

      const count = dirtyKeys.size;
      setDirtyKeys(new Set());
      showToast(`${count} data harga berhasil disimpan`);
    } catch (err) {
      showToast(err.message || "Gagal menyimpan", "error");
    } finally {
      setSaving(false);
    }
  };

  const shiftDate = (days) => {
    const d = new Date(tanggal);
    d.setDate(d.getDate() + days);
    setTanggal(d.toISOString().slice(0, 10));
  };

  const filledCount = Object.values(grid).reduce(
    (acc, pasarMap) =>
      acc + Object.values(pasarMap).filter((c) => c.raw !== "").length,
    0,
  );
  const totalCells = komoditasList.length * pasarList.length;

  if (dataLoading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-muted rounded" />
          <div className="h-96 bg-muted rounded-xl" />
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Input Harga Harian
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {filledCount} dari {totalCells} data terisi
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Navigasi tanggal */}
          <div className="flex items-center gap-1 rounded-xl border border-border bg-background px-1 py-1">
            <button
              onClick={() => shiftDate(-1)}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <input
              type="date"
              value={tanggal}
              max={today}
              onChange={(e) => setTanggal(e.target.value)}
              className="px-2 py-1 text-sm bg-transparent text-foreground focus:outline-none"
            />
            <button
              onClick={() => shiftDate(1)}
              disabled={tanggal >= today}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {tanggal !== today && (
            <button
              onClick={() => setTanggal(today)}
              className="px-3 py-2 text-xs rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors"
            >
              Hari Ini
            </button>
          )}

          <button
            onClick={handleSave}
            disabled={saving || dirtyKeys.size === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-semibold"
          >
            {saving ? (
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving
              ? "Menyimpan..."
              : `Simpan${dirtyKeys.size > 0 ? ` (${dirtyKeys.size})` : ""}`}
          </button>
        </div>
      </div>

      {/* Info tanggal */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm font-medium text-foreground">
          {formatTanggal(tanggal)}
        </span>
        {tanggal === today && (
          <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium">
            Hari ini
          </span>
        )}
        {dirtyKeys.size > 0 && (
          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-medium">
            {dirtyKeys.size} belum disimpan
          </span>
        )}
      </div>

      {/* Banner pre-fill */}
      {isPrefill && (
        <div className="flex items-center gap-2 mb-4 px-3 py-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm">
          <svg
            className="w-4 h-4 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Belum ada data untuk tanggal ini. Ditampilkan harga terakhir sebagai
          referensi — simpan untuk menyalin ke tanggal ini.
        </div>
      )}

      {/* Tabel Grid */}
      <div className="rounded-xl border border-border overflow-auto">
        <table
          className="text-sm border-collapse"
          style={{ minWidth: `${200 + pasarList.length * 160}px` }}
        >
          <thead>
            <tr className="bg-muted/60 border-b border-border">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground sticky left-0 bg-muted/60 z-10 min-w-50 border-r border-border">
                Komoditas
              </th>
              {pasarList.map((p) => (
                <th
                  key={p.id}
                  className="text-center px-3 py-3 font-medium text-muted-foreground min-w-40 whitespace-nowrap"
                >
                  {p.nama}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {komoditasList.map((k) => (
              <tr key={k.id} className="hover:bg-muted/20 transition-colors">
                <td className="px-4 py-2.5 sticky left-0 bg-background hover:bg-muted/20 border-r border-border z-10">
                  <span className="font-medium text-foreground">
                    {k.nama_komoditas}
                  </span>
                  <span className="ml-1.5 text-xs text-muted-foreground">
                    /{k.satuan}
                  </span>
                </td>

                {pasarList.map((p) => {
                  const cell = getCell(k.id, p.id);
                  const key = `${k.id}:${p.id}`;
                  const isDirty = dirtyKeys.has(key);
                  const isFilled = cell.raw !== "";

                  return (
                    <td key={p.id} className="px-2 py-2">
                      <div
                        className={`relative flex items-center rounded-lg border transition-colors ${isDirty ? "border-amber-400 bg-amber-50 dark:bg-amber-950/20" : isFilled ? "border-border bg-background" : "border-dashed border-border/60 bg-muted/30"}`}
                      >
                        <span className="pl-2.5 text-xs text-muted-foreground shrink-0">
                          Rp
                        </span>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={cell.display}
                          onChange={(e) =>
                            updateCell(k.id, p.id, e.target.value)
                          }
                          placeholder="—"
                          className="w-full pl-1 pr-2.5 py-2 bg-transparent text-foreground text-sm text-right focus:outline-none placeholder:text-muted-foreground/40"
                        />
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {komoditasList.length === 0 && (
          <div className="py-16 text-center text-muted-foreground text-sm">
            Belum ada komoditas aktif
          </div>
        )}
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Cell berwarna kuning = belum disimpan. Kosongkan cell untuk menghapus
        harga di tanggal tersebut.
      </p>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}