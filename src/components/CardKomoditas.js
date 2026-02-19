"use client";

import { ArrowUp, ArrowDown, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const VARIANT_CONFIG = {
  Tertinggi: {
    icon: ArrowUp,
    label: "Harga Tertinggi",
    className: "bg-primary text-primary-foreground hover:bg-primary/90",
  },
  Terendah: {
    icon: ArrowDown,
    label: "Harga Terendah",
    className: "bg-destructive text-white hover:bg-destructive/90",
  },
  default: {
    icon: Circle,
    label: "Harga Rata-Rata",
    className: "bg-blue-600 text-white hover:bg-blue-700",
  },
};

export default function CardKomoditas({ pasar, price, tipe, satuan }) {
  const config = VARIANT_CONFIG[tipe] || VARIANT_CONFIG.default;
  const Icon = config.icon;

  return (
    <Card className="flex flex-col items-center justify-center text-center p-6">
      <CardContent className="p-0 space-y-2">
        <p className="text-2xl font-bold text-foreground">
          Rp {Number(price).toLocaleString("id-ID")}/{satuan}
        </p>
        <p className="text-sm text-muted-foreground font-medium">{pasar}</p>
        <Badge
          className={cn(
            "w-full justify-center gap-1.5 py-1.5 rounded-full text-sm font-semibold",
            config.className
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          {config.label}
        </Badge>
      </CardContent>
    </Card>
  );
}
