"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function PasarFormModal({
  open,
  onClose,
  onSubmit,
  initialData,
  loading,
}) {
  const [form, setForm] = useState({
    nama: "",
    alamat: "",
    kecamatan: "",
    latitude: "",
    longitude: "",
    status: 1,
  });
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);
  const isEdit = !!initialData;

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        nama: initialData.nama || "",
        alamat: initialData.alamat || "",
        kecamatan: initialData.kecamatan || "",
        latitude: initialData.latitude || "",
        longitude: initialData.longitude || "",
        status: initialData.status ?? 1,
      });
      setPreview(
        initialData.product_photo
          ? initialData.product_photo 
          : null,
      );
    } else {
      setForm({
        nama: "",
        alamat: "",
        kecamatan: "",
        latitude: "",
        longitude: "",
        status: 1,
      });
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
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    if (fileRef.current?.files[0]) {
      formData.append("product_photo", fileRef.current.files[0]);
    }
    onSubmit(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-background border border-border rounded-2xl shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            {isEdit ? "Edit Pasar" : "Tambah Pasar"}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Photo upload */}
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
              Nama Pasar <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              required
              placeholder="Contoh: Pasar Sentral"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
            />
          </div>

          {/* Alamat */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Alamat
            </label>
            <textarea
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
              rows={2}
              placeholder="Jl. ..."
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm resize-none"
            />
          </div>

          {/* Kecamatan */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Kecamatan
            </label>
            <input
              type="text"
              name="kecamatan"
              value={form.kecamatan}
              onChange={handleChange}
              placeholder="Contoh: Medan Kota"
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
            />
          </div>

          {/* Koordinat */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
                placeholder="3.5952"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                placeholder="98.6722"
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-sm"
              />
            </div>
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
                  : "Tambah Pasar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
