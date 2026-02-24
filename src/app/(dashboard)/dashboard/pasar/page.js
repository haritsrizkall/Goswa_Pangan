"use client";

import { useEffect, useState, useCallback } from "react";
import {
  adminFetchPasar,
  adminCreatePasar,
  adminUpdatePasar,
  adminDeletePasar,
  fetchPasar,
} from "@/lib/api";
import PasarFormModal from "@/components/admin/PasarFormModal";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import Toast from "@/components/admin/Toast";
import MarketCardSkeleton from "@/components/MarketCardSkeleton";
import CardSimple from "@/components/admin/CardSimple";
import SearchBar from "@/components/admin/SearchBar";

export default function Pasar() {
  const [pasar, setPasar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal states
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => setToast({ message, type });

  const loadPasar = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchPasar();
      setPasar(res.data || []);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPasar();
  }, [loadPasar]);

  // Filtered list
  const filtered = pasar.filter(
    (p) =>
      p.nama.toLowerCase().includes(search.toLowerCase()) ||
      (p.kecamatan || "").toLowerCase().includes(search.toLowerCase()),
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
        await adminUpdatePasar(editTarget.id, formData);
        showToast("Pasar berhasil diupdate");
      } else {
        await adminCreatePasar(formData);
        showToast("Pasar berhasil ditambahkan");
      }
      setFormOpen(false);
      setEditTarget(null);
      await loadPasar();
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
      await adminDeletePasar(deleteTarget.id);
      showToast(`${deleteTarget.nama} berhasil dihapus`);
      setDeleteTarget(null);
      await loadPasar();
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
            Manajemen Pasar
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Kelola data pasar yang tampil di aplikasi
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
          Tambah Pasar
        </button>
      </div>

      {/* Search */}
      <SearchBar
        value={search}
        onChange={setSearch}
        total={filtered.length}
        placeholder="Cari pasar..."
        resultLabel="pasar"
      />

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <MarketCardSkeleton key={i} />
            ))
          : filtered.map((item) => (
              <CardSimple
                key={item.id}
                item={item}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
              />
            ))}
      </div>

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <p className="text-foreground font-medium mb-1">
            {search ? "Pasar tidak ditemukan" : "Belum ada pasar"}
          </p>
          <p className="text-sm text-muted-foreground">
            {search
              ? "Coba kata kunci lain"
              : 'Klik "Tambah Pasar" untuk menambahkan data pertama'}
          </p>
        </div>
      )}

      {/* Modals */}
      <PasarFormModal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditTarget(null);
        }}
        onSubmit={handleSubmitForm}
        initialData={editTarget}
        loading={formLoading}
      />

      <DeleteConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
        title="Hapus Pasar"
        itemName={deleteTarget?.nama}
      />

      {/* Toast */}
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