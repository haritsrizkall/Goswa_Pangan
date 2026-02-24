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

// ─── Admin Pasar API ─────────────────────────────────────────────────────────
export async function adminCreatePasar(formData) {
  const res = await fetch(`${BASE_URL}/api/pasar`, {
    method: "POST",
    body: formData, 
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Gagal menambah pasar");
  }
  return res.json();
}

export async function adminUpdatePasar(id, formData) {
  const res = await fetch(`${BASE_URL}/api/pasar/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Gagal mengupdate pasar");
  }
  return res.json();
}

export async function adminDeletePasar(id) {
  const res = await fetch(`${BASE_URL}/api/pasar/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Gagal menghapus pasar");
  }
  return res.json();
}

// ─── Admin Komoditas API ─────────────────────────────────────────────────────────
export async function fetchKategori() {
  const res = await fetch(`${BASE_URL}/api/komoditas/kategori`, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal fetch kategori");
  return res.json();
}

export async function adminCreateKomoditas(formData) {
  const res = await fetch(`${BASE_URL}/api/komoditas`, {
    method: "POST",
    body: formData, 
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Gagal menambah komoditas");
  }
  return res.json();
}

export async function adminUpdateKomoditas(id, formData) {
  const res = await fetch(`${BASE_URL}/api/komoditas/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Gagal mengupdate komoditas");
  }
  return res.json();
}

export async function adminDeleteKomoditas(id) {
  const res = await fetch(`${BASE_URL}/api/komoditas/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Gagal menghapus komoditas");
  }
  return res.json();
}

// ─── Admin Harga API ─────────────────────────────────────────────────────────
export async function fetchHargaByKomoditas(komoditas_id) {
  const res = await fetch(`${BASE_URL}/api/harga/komoditas/${komoditas_id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal fetch harga komoditas");
  return res.json();
}

export async function fetchHargaByTanggal(tanggal) {
  const res = await fetch(`${BASE_URL}/api/harga/tanggal/${tanggal}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Gagal fetch harga by tanggal");
  return res.json();
}