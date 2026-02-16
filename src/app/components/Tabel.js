export default function Tabel({ data = [], mode, bulan, tahun, loading }) {
  if (loading) {
    return <p className="text-center text-gray-500 py-10">Memuat data...</p>;
  }
  if (!data.length) {
    return (
      <p className="text-center text-gray-400 py-10">
        Tidak ada data tersedia.
      </p>
    );
  }

  const today = new Date();
  const todayTahun = today.getFullYear();
  const todayBulan = today.getMonth() + 1;
  const todayHari = today.getDate();

  const totalHari = new Date(Number(tahun), Number(bulan), 0).getDate();

  const hariList = Array.from({ length: totalHari }, (_, i) => i + 1);

  const toNumber = (val) => {
    const n = Number(val);
    return isNaN(n) ? null : n;
  };

  const formatRupiah = (val) =>
    val != null ? `Rp. ${Number(val).toLocaleString("id-ID")}` : "-";

  const isMasaLalu = (hari) => {
    const sedangBulanIni =
      Number(tahun) === todayTahun && Number(bulan) === todayBulan;
    if (!sedangBulanIni) {
      const tgl = new Date(Number(tahun), Number(bulan) - 1, 1);
      return tgl < new Date(todayTahun, todayBulan - 1, 1);
    }
    return hari <= todayHari;
  };

  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-3xl border border-black">
      <table className="w-full text-sm text-left text-body">
        <thead className="text-sm text-black bg-gray-300 border-b border-gray-250">
          <tr>
            <th className="px-6 py-3 font-bold">No</th>
            <th className="px-6 py-3 font-bold">
              {mode === "Per Pasar" ? "Nama Komoditas" : "Nama Pasar"}
            </th>
            {hariList.map((hari) => (
              <th key={hari} className="px-6 py-3 font-bold">
                {hari}
              </th>
            ))}
            <th className="px-6 py-3 font-bold">Rata-rata</th>
            <th className="px-6 py-3 font-bold">Maks</th>
            <th className="px-6 py-3 font-bold">Min</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => {
            const hargaArr = hariList.map((hari) => {
              const found = row.harga_per_hari?.find(
                (h) => Number(h.hari) === hari,
              );
              const harga = toNumber(found?.harga);

              if (harga != null) return harga;
              if (!isMasaLalu(hari)) return undefined;
              return null; 
            });

            // Hitung statistik hanya dari hari yang punya data (bukan 0 karena kosong)
            const valid = hargaArr.filter(
              (v) => v != null && v !== undefined && v > 0,
            );
            const rataRata = valid.length
              ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length)
              : null;
            const maks = valid.length ? Math.max(...valid) : null;
            const min = valid.length ? Math.min(...valid) : null;

            return (
              <tr
                key={row.id ?? idx}
                className="bg-neutral-primary border-b border-black last:border-0"
              >
                <th className="px-6 py-4 font-medium text-black whitespace-nowrap">
                  {idx + 1}
                </th>
                <td className="px-6 py-4 text-black">
                  {mode === "Per Pasar" ? row.nama_komoditas : row.nama_pasar}
                </td>
                {hargaArr.map((h, i) => (
                  <td key={i} className="px-6 py-4 text-black">
                    {h === undefined ? "" : formatRupiah(h)}
                  </td>
                ))}
                <td className="px-6 py-4 text-black">
                  {formatRupiah(rataRata)}
                </td>
                <td className="px-6 py-4 text-black">{formatRupiah(maks)}</td>
                <td className="px-6 py-4 text-black">{formatRupiah(min)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
