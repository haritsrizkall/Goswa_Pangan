"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Plus, Trash2 } from "lucide-react";
import { fetchHargaByKomoditas, fetchPasar } from "@/lib/api";

export default function KomoditasFormModal({
  open,
  onClose,
  onSubmit,
  initialData,
  loading,
  kategoriList,
}) {
  const [form, setForm] = useState({
    nama: "",
    satuan: "",
    kategori_id: "",
    nama_kategori_baru: "",
    status: 1,
  });
  const [kategoriMode, setKategoriMode] = useState("pilih"); // "pilih" | "baru"
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  const isEdit = !!initialData;

  useEffect(() => {
    if (!open) return;

    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        nama: initialData.nama_komoditas || "",
        satuan: initialData.satuan || "",
        kategori_id: initialData.kategori_id || "",
        nama_kategori_baru: "",
        status: initialData.status ?? 1,
      });
      setKategoriMode("pilih");
      setPreview(
        initialData.product_photo
          ? `${process.env.NEXT_PUBLIC_API_URL}/images/${initialData.product_photo}`
          : null,
      );
    } else {
      setForm({
        nama: "",
        satuan: "",
        kategori_id: "",
        nama_kategori_baru: "",
        status: 1,
      });
      setKategoriMode("pilih");
      setPreview(null);
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama", form.nama);
    formData.append("satuan", form.satuan);
    formData.append("harga", form.harga);
    formData.append("status", form.status);

    if (kategoriMode === "baru") {
      formData.append("nama_kategori_baru", form.nama_kategori_baru);
    } else {
      formData.append("kategori_id", form.kategori_id);
    }

    if (fileRef.current?.files[0]) {
      formData.append("product_photo", fileRef.current.files[0]);
    }

    onSubmit(formData);
  };

  if (!open) return null;

  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-background border border-border rounded-2xl shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            {isEdit ? "Edit Komoditas" : "Tambah Komoditas"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Photo */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-24 h-24 rounded-xl border-2 border-dashed border-border bg-muted flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => fileRef.current?.click()}
            >
              {preview ? (
                <Image
                  width={0}
                  height={0}
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  className="w-8 h-8 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
            <p className="text-xs text-muted-foreground">
              Klik untuk upload foto (maks. 2MB)
            </p>
          </div>

          {/* Nama */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Nama Komoditas <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              required
              placeholder="Contoh: Beras Medium"
              className={inputClass}
            />
          </div>

          {/* Kategori */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-foreground">
                Kategori <span className="text-destructive">*</span>
              </label>
              {/* Toggle */}
              <div className="flex rounded-lg border border-border overflow-hidden text-xs">
                <button
                  type="button"
                  onClick={() => setKategoriMode("pilih")}
                  className={`px-3 py-1 transition-colors ${
                    kategoriMode === "pilih"
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  Pilih
                </button>
                <button
                  type="button"
                  onClick={() => setKategoriMode("baru")}
                  className={`px-3 py-1 transition-colors ${
                    kategoriMode === "baru"
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  + Baru
                </button>
              </div>
            </div>

            {kategoriMode === "pilih" ? (
              <select
                name="kategori_id"
                value={form.kategori_id}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="">-- Pilih Kategori --</option>
                {kategoriList.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.nama}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name="nama_kategori_baru"
                value={form.nama_kategori_baru}
                onChange={handleChange}
                required
                placeholder="Nama kategori baru..."
                className={inputClass}
                autoFocus
              />
            )}
          </div>

          {/* Satuan */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Satuan <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              name="satuan"
              value={form.satuan}
              onChange={handleChange}
              required
              placeholder="kg / liter / ikat / butir"
              className={inputClass}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Status
            </label>
            <div className="flex gap-3">
              {[
                { label: "Aktif", value: 1 },
                { label: "Nonaktif", value: 0 },
              ].map(({ label, value }) => (
                <label
                  key={value}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all text-sm ${
                    Number(form.status) === value
                      ? "border-primary bg-primary/10 text-primary font-medium"
                      : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={value}
                    checked={Number(form.status) === value}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span
                    className={`w-2 h-2 rounded-full ${Number(form.status) === value ? "bg-primary" : "bg-muted-foreground/40"}`}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors text-sm font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-sm font-medium flex items-center justify-center gap-2"
            >
              {loading && (
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
              )}
              {loading
                ? "Menyimpan..."
                : isEdit
                  ? "Simpan Perubahan"
                  : "Tambah Komoditas"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
