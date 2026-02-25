"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function CardSimple({ img, title, sub }) {
  const imgSrc = item.product_photo
    ? item.product_photo
    : `/images/placeholder-pasar.jpg`;

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden bg-muted">
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
          <MapPin className="h-4 w-4" />
          {sub}
        </span>
      </CardContent>
    </Card>
  );
}
