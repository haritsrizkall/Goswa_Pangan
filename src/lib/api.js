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