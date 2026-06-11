import { useState } from "react";
import { useMataKuliah } from "../../utils/hooks/useMataKuliah";

export default function MataKuliahPage() {
  const { data: matkul = [], isLoading, isError } = useMataKuliah();

  const [selected, setSelected] = useState(null);

  if (isLoading) {
    return <p>Loading data mata kuliah...</p>;
  }

  if (isError) {
    return <p>Gagal mengambil data mata kuliah</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Data Mata Kuliah</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Kode</th>
            <th className="border p-2">Nama Mata Kuliah</th>
            <th className="border p-2">SKS</th>
          </tr>
        </thead>

        <tbody>
          {matkul.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.kode}</td>
              <td className="border p-2">{item.nama}</td>
              <td className="border p-2">{item.sks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
