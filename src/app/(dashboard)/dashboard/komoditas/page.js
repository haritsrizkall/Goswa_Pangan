"use client";

import { useEffect, useState, useCallback } from "react";
import {
  adminCreateKomoditas,
  adminUpdateKomoditas,
  adminDeleteKomoditas,
  fetchKomoditas,
  fetchKategori,
} from "@/lib/api";

import CardComplex from "@/components/admin/CardComplex";
import CommodityCardSkeleton from "@/components/CommodityCardSkeleton";
import KomoditasFormModal from "@/components/admin/KomoditasFormModal";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import Toast from "@/components/admin/Toast";
import SearchBar from "@/components/admin/SearchBar";

export default function Home() {
  const [komoditas, setKomoditas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [kategoriList, setKategoriList] = useState([]);

  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => setToast({ message, type });

  useEffect(() => {
    fetchKategori()
      .then((res) => setKategoriList(res.data || []))
      .catch((err) => showToast(err.message, "error"));
  }, []);

  const loadKomoditas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchKomoditas();
      setKomoditas(res.data || []);
    } catch (err) {
      setError(err.message);
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadKomoditas();
  }, [loadKomoditas]);

  const filtered = komoditas.filter((k) =>
    k.nama_komoditas.toLowerCase().includes(search.toLowerCase()),
  );

  // Handlers
  const handleOpenCreate = () => {
    setEditTarget(null);
    setFormOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditTarget(item);
    setFormOpen(true);
  };

  const handleOpenDelete = (item) => {
    setDeleteTarget(item);
  };

  const handleSubmitForm = async (formData) => {
    setFormLoading(true);
    try {
      if (editTarget) {
        await adminUpdateKomoditas(editTarget.id, formData);
        showToast("Komoditas berhasil diupdate");
      } else {
        await adminCreateKomoditas(formData);
        showToast("Komoditas berhasil ditambahkan");
      }
      setFormOpen(false);
      setEditTarget(null);
      await loadKomoditas();
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setFormLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await adminDeleteKomoditas(deleteTarget.id);
      showToast(`${deleteTarget.nama_komoditas} berhasil dihapus`);
      setDeleteTarget(null);
      await loadKomoditas();
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Manajemen Komoditas
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola data komoditas yang tampil di aplikasi
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-semibold shadow-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Tambah Komoditas
        </button>
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        total={filtered.length}
        placeholder="Cari komoditas..."
        resultLabel="komoditas"
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <CommodityCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <CardComplex
              key={item.id}
              item={item}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          ))}
        </div>
      )}

      <KomoditasFormModal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditTarget(null);
        }}
        onSubmit={handleSubmitForm}
        initialData={editTarget}
        loading={formLoading}
        kategoriList={kategoriList}
      />

      <DeleteConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
        title="Hapus Komoditas"
        itemName={deleteTarget?.nama_komoditas}
      />

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
