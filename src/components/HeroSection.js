import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Goswa Pangan Palas
          </h1>
          <p className="mt-4 text-lg md:text-xl opacity-90 max-w-xl">
            Portal informasi harga komoditas pangan Kota Palas — pantau harga
            terkini, bandingkan antar pasar, dan lihat tren harga.
          </p>
        </div>
        <div className="flex-shrink-0">
          <Image
            src="/images/logo.png"
            alt="Logo Goswa Pangan"
            width={140}
            height={140}
            className="drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
