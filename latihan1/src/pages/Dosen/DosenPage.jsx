import { useState } from "react";
import { useDosen } from "../../utils/hooks/useDosen";

export default function DosenPage() {
  const { data: dosen = [], isLoading, isError } = useDosen();

  const [selected, setSelected] = useState(null);

  if (isLoading) {
    return <p>Loading data dosen...</p>;
  }

  if (isError) {
    return <p>Gagal mengambil data dosen</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Data Dosen</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Nama</th>
            <th className="border p-2">Mata Kuliah</th>
          </tr>
        </thead>

        <tbody>
          {dosen.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.nama}</td>
              <td className="border p-2">{item.matakuliah}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
