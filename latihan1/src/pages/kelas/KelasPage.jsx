import { Link } from "react-router-dom";
import { useState } from "react";

import { useKelas, useDeleteKelas } from "../../utils/hooks/useKelas";
import { useDosen } from "../../utils/hooks/useDosen";
import { useMataKuliah } from "../../utils/hooks/useMataKuliah";

import Pagination from "../../components/Pagination";

export default function KelasPage() {
  const { data: kelas = [] } = useKelas();
  const { data: dosen = [] } = useDosen();
  const { data: matakuliah = [] } = useMataKuliah();

  const deleteKelas = useDeleteKelas();

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentKelas = kelas.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(kelas.length / itemsPerPage);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus kelas?");

    if (!confirmDelete) return;

    try {
      await deleteKelas.mutateAsync(id);

      alert("Data berhasil dihapus");
    } catch {
      alert("Gagal menghapus data");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Data Kelas</h1>

        <Link
          to="/admin/kelas/tambah"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Tambah Kelas
        </Link>
      </div>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Kelas</th>
            <th className="border p-2">Mata Kuliah</th>
            <th className="border p-2">Dosen</th>
            <th className="border p-2">Jumlah Mahasiswa</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {currentKelas.map((item) => {
            const mk = matakuliah.find(
              (m) => String(m.id) === String(item.matakuliahId),
            );

            const dosenData = dosen.find(
              (d) => String(d.id) === String(item.dosenId),
            );

            return (
              <tr key={item.id}>
                <td className="border p-2">{item.id}</td>

                <td className="border p-2">{item.namaKelas}</td>

                <td className="border p-2">{mk?.nama || "-"}</td>

                <td className="border p-2">{dosenData?.nama || "-"}</td>

                <td className="border p-2">{item.mahasiswaIds?.length || 0}</td>

                <td className="border p-2 space-x-2">
                  <Link
                    to={`/admin/kelas/edit/${item.id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
