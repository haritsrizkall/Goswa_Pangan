import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Tabel({ data = [], mode, bulan, tahun, loading }) {
  if (loading) {
    return (
      <p className="text-center text-muted-foreground py-10">Memuat data...</p>
    );
  }
  if (!data.length) {
    return (
      <p className="text-center text-muted-foreground py-10">
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
    <div className="relative overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead className="font-bold">No</TableHead>
            <TableHead className="font-bold">
              {mode === "Per Pasar" ? "Nama Komoditas" : "Nama Pasar"}
            </TableHead>
            {hariList.map((hari) => (
              <TableHead key={hari} className="font-bold">
                {hari}
              </TableHead>
            ))}
            <TableHead className="font-bold">Rata-rata</TableHead>
            <TableHead className="font-bold">Maks</TableHead>
            <TableHead className="font-bold">Min</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
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

            const valid = hargaArr.filter(
              (v) => v != null && v !== undefined && v > 0,
            );
            const rataRata = valid.length
              ? Math.round(valid.reduce((a, b) => a + b, 0) / valid.length)
              : null;
            const maks = valid.length ? Math.max(...valid) : null;
            const min = valid.length ? Math.min(...valid) : null;

            return (
              <TableRow key={row.id ?? idx}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>
                  {mode === "Per Pasar" ? row.nama_komoditas : row.nama_pasar}
                </TableCell>
                {hargaArr.map((h, i) => (
                  <TableCell key={i}>
                    {h === undefined ? "" : formatRupiah(h)}
                  </TableCell>
                ))}
                <TableCell>{formatRupiah(rataRata)}</TableCell>
                <TableCell>{formatRupiah(maks)}</TableCell>
                <TableCell>{formatRupiah(min)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
