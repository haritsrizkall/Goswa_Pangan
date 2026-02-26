"use client";

import Image from "next/image";
import { ArrowUp, ArrowDown, Minus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function CardComplex({ item, onEdit, onDelete }) {
  const imgSrc = item.product_photo
    ? item.product_photo
    : `${process.env.NEXT_PUBLIC_API_URL}/images/placeholder-komoditas.jpg`;

  const harga = Number(item.harga_hari_ini || 0);
  const hargaMin = Number(item.harga_min_hari_ini || 0);
  const hargaMax = Number(item.harga_max_hari_ini || 0);
  const selisih = Number(item.selisih || 0);

  const isUp = selisih > 0;
  const isDown = selisih < 0;

  const Icon = isUp ? ArrowUp : isDown ? ArrowDown : Minus;
  const label = isUp
    ? `Naik Rp ${Math.abs(selisih).toLocaleString("id-ID")}`
    : isDown
      ? `Turun Rp ${Math.abs(selisih).toLocaleString("id-ID")}`
      : "Stabil";

  const hasRange = hargaMin > 0 && hargaMax > 0 && hargaMin !== hargaMax;

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-40 overflow-hidden">
        <Image
          src={imgSrc}
          alt={item.nama_komoditas}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />

        {/* Status badge */}
        <span
          className={`absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
            item.status === 1
              ? "bg-green-500/80 text-white"
              : "bg-black/50 text-white"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              item.status === 1 ? "bg-white" : "bg-gray-400"
            }`}
          />
          {item.status === 1 ? "Aktif" : "Nonaktif"}
        </span>

        {/* Action buttons — appear on hover over image */}
        <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(item)}
            className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-primary shadow-sm transition-colors"
            title="Edit"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(item)}
            className="p-1.5 rounded-lg bg-white/90 hover:bg-white text-destructive shadow-sm transition-colors"
            title="Hapus"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <CardContent className="p-4 space-y-2">
        <p className="text-sm text-muted-foreground font-medium">
          {item.nama_komoditas}
        </p>

        {/* Harga rata-rata */}
        <div>
          <p className="text-base font-bold text-foreground">
            Rp {harga.toLocaleString("id-ID")}
            <span className="text-xs font-normal text-muted-foreground">
              /{item.satuan}
            </span>
          </p>
          <p className="text-xs text-muted-foreground">rata-rata semua pasar</p>
        </div>

        {/* Range min–max (hanya tampil kalau ada lebih dari 1 harga berbeda) */}
        {hasRange && (
          <div className="flex items-center justify-between text-xs bg-muted/40 rounded-lg px-2.5 py-1.5">
            <span className="text-green-600 dark:text-green-400 font-medium">
              ↓ {hargaMin.toLocaleString("id-ID")}
            </span>
            <span className="text-muted-foreground/40">|</span>
            <span className="text-red-500 dark:text-red-400 font-medium">
              ↑ {hargaMax.toLocaleString("id-ID")}
            </span>
          </div>
        )}

        <Badge
          variant="outline"
          className={cn(
            "w-full justify-center gap-1.5 py-1.5 rounded-full text-sm font-semibold",
            isUp && "border-price-up text-price-up bg-price-up/10",
            isDown && "border-price-down text-price-down bg-price-down/10",
            !isUp &&
              !isDown &&
              "border-price-stable text-price-stable bg-price-stable/10",
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </Badge>

        {/* Action buttons — always visible below content */}
        <div className="flex gap-2 mt-3 pt-3 border-t border-border">
          <button
            onClick={() => onEdit(item)}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </button>
          <button
            onClick={() => onDelete(item)}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Hapus
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
