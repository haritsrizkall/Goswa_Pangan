"use client";

import Image from "next/image";
import { MapPin, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function CardSimple({ item, onEdit, onDelete }) {
  const imgSrc = item.product_photo
    ?  item.product_photo
    : `${process.env.NEXT_PUBLIC_API_URL}/images/placeholder-pasar.jpg`;

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
      <div className="relative h-48 overflow-hidden bg-muted">
        <Image
          src={imgSrc}
          alt={item.nama}
          width={0}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
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

      <CardContent className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{item.nama}</h3>
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
            <MapPin className="h-4 w-4" />
            {item.alamat || item.kecamatan || "-"}
          </span>
        </div>

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
