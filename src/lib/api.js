const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchPasar() {
    const res = await fetch(`${BASE_URL}/api/pasar`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Gagal fetch pasar");
    }

    return res.json();
}

export async function fetchKomoditas() {
    const res = await fetch(`${BASE_URL}/api/komoditas`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Gagal fetch komoditas");
    }

    return res.json();
}

export async function fetchKomoditasByNama() {
    const res = await fetch(`${BASE_URL}/api/komoditas/nama`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Gagal fetch komoditas");
    }

    return res.json();
}

export async function fetchGrafikKomoditas(komoditas, bulan, tahun) {
    const res = await fetch(`${BASE_URL}/api/harga/grafik-komoditas/${komoditas}/${bulan}/${tahun}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Gagal fetch Grafik Komoditas");
    }

    return res.json();
}

export async function fetchGrafikPasar(pasar, bulan, tahun) {
    const res = await fetch(`${BASE_URL}/api/harga/grafik-pasar/${pasar}/${bulan}/${tahun}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Gagal fetch Grafik Pasar");
    }

    return res.json();
}

export async function fetchTabelPerPasar(pasar, bulan, tahun) {
  const res = await fetch(
    `${BASE_URL}/api/harga/tabel-pasar/${pasar}/${bulan}/${tahun}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Gagal fetch tabel per pasar");
  return res.json();
}

export async function fetchTabelPerKomoditas(komoditas, bulan, tahun) {
  const res = await fetch(
    `${BASE_URL}/api/harga/tabel-komoditas/${komoditas}/${bulan}/${tahun}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Gagal fetch tabel per komoditas");
  return res.json();
}