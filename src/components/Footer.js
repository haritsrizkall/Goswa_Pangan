import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold">Goswa Pangan Palas</h3>
            <p className="text-sm opacity-80 mt-1">
              Dinas Ketahanan Pangan Kota Palas
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-6 text-sm font-medium">
            <Link href="/" className="hover:underline opacity-90 hover:opacity-100">
              Beranda
            </Link>
            <Link href="/komoditas" className="hover:underline opacity-90 hover:opacity-100">
              Komoditas
            </Link>
            <Link href="/pasar" className="hover:underline opacity-90 hover:opacity-100">
              Pasar
            </Link>
            <Link href="/statistik" className="hover:underline opacity-90 hover:opacity-100">
              Statistik
            </Link>
          </nav>
        </div>

        <Separator className="my-6 bg-primary-foreground/20" />

        {/* Copyright */}
        <p className="text-sm text-center opacity-70">
          &copy; {new Date().getFullYear()} Dinas Ketahanan Pangan Kota Palas.
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
