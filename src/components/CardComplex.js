"use client";

import Image from "next/image";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function CardComplex({ item }) {
  const harga = Number(item.harga_hari_ini || 0);
  const selisih = Number(item.selisih || 0);

  const isUp = selisih > 0;
  const isDown = selisih < 0;

  const Icon = isUp ? ArrowUp : isDown ? ArrowDown : Minus;
  const label = isUp
    ? `Naik Rp ${Math.abs(selisih).toLocaleString("id-ID")}`
    : isDown
      ? `Turun Rp ${Math.abs(selisih).toLocaleString("id-ID")}`
      : "Stabil";

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-40 overflow-hidden bg-muted">
        <Image
          src={`/images/${item.product_photo}`}
          alt={item.nama_komoditas}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4 space-y-2">
        <p className="text-sm text-muted-foreground font-medium">
          {item.nama_komoditas}
        </p>
        <p className="text-base font-bold text-foreground">
          Rp {harga.toLocaleString("id-ID")}/{item.satuan}
        </p>
        <Badge
          variant="outline"
          className={cn(
            "w-full justify-center gap-1.5 py-1.5 rounded-full text-sm font-semibold",
            isUp && "border-price-up text-price-up bg-price-up/10",
            isDown && "border-price-down text-price-down bg-price-down/10",
            !isUp && !isDown && "border-price-stable text-price-stable bg-price-stable/10"
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </Badge>
      </CardContent>
    </Card>
  );
}
