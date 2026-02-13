export default function Tabel() {
  return (
    <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-3xl border border-black">
      <table class="w-full text-sm text-left rtl:text-right text-body">
        <thead class="text-sm text-body text-black bg-gray-300 border-b border-gray-250 rounded-base border-default">
          <tr>
            <th scope="col" className="px-6 py-3 font-bold">
              No
            </th>
            <th scope="col" className="px-6 py-3 font-bold">
              Nama Pasar
            </th>
            <th scope="col" className="px-6 py-3 font-bold">
              1
            </th>
            <th scope="col" className="px-6 py-3 font-bold">
              2
            </th>
            <th scope="col" className="px-6 py-3 font-bold">
              3
            </th>
            <th scope="col" className="px-6 py-3 font-bold">
              28
            </th>
            <th scope="col" className="px-6 py-3 font-bold">
              Rata-rata
            </th>
            <th scope="col" className="px-6 py-3 font-bold">
              Maks
            </th>
            <th scope="col" className="px-6 py-3 font-bold">
              Mins
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-neutral-primary border-b border-black">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-black text-heading whitespace-nowrap"
            >
              1
            </th>
            <td class="px-6 py-4 text-black">Samano</td>
            <td class="px-6 py-4 text-black">Rp. 15.000</td>
            <td class="px-6 py-4 text-black">Rp. 15.000</td>
            <td class="px-6 py-4 text-black">Rp. 15.200</td>
            <td class="px-6 py-4 text-black">Rp. 15.200</td>
            <td class="px-6 py-4 text-black">Rp. 15.000</td>
            <td class="px-6 py-4 text-black">Rp. 15.500</td>
            <td class="px-6 py-4 text-black">Rp. 15.250</td>
          </tr>
          <tr class="bg-neutral-primary border-b border-black">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-black text-heading whitespace-nowrap"
            >
              2
            </th>
            <td class="px-6 py-4 text-black">Senen</td>
            <td class="px-6 py-4 text-black">Rp. 15.000</td>
            <td class="px-6 py-4 text-black">Rp. 15.000</td>
            <td class="px-6 py-4 text-black">Rp. 15.090</td>
            <td class="px-6 py-4 text-black">Rp. 15.200</td>
            <td class="px-6 py-4 text-black">Rp. 15.200</td>
            <td class="px-6 py-4 text-black">Rp. 15.750</td>
            <td class="px-6 py-4 text-black">Rp. 15.000</td>
          </tr>
          <tr class="bg-neutral-primary">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-black text-heading whitespace-nowrap"
            >
              3
            </th>
            <td class="px-6 py-4 text-black">Glodok</td>
            <td class="px-6 py-4 text-black">Rp. 15.000</td>
            <td class="px-6 py-4 text-black">Rp. 15.000</td>
            <td class="px-6 py-4 text-black">Rp. 15.500</td>
            <td class="px-6 py-4 text-black">Rp. 15.200</td>
            <td class="px-6 py-4 text-black">Rp. 15.300</td>
            <td class="px-6 py-4 text-black">Rp. 16.000</td>
            <td class="px-6 py-4 text-black">Rp. 15.100</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
