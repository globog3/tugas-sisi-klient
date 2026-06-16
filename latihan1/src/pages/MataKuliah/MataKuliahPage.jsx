import { useState } from "react";
import { Link } from "react-router-dom";

import {
  useMataKuliah,
  useDeleteMataKuliah,
} from "../../utils/hooks/useMataKuliah";

import Pagination from "../../components/Pagination";

export default function MataKuliahPage() {
  const { data: matkul = [], isLoading, isError } = useMataKuliah();

  const remove = useDeleteMataKuliah();

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentMatkul = matkul.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(matkul.length / itemsPerPage);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus data?");

    if (!confirmDelete) return;

    try {
      await remove.mutateAsync(id);
      alert("Data berhasil dihapus");
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus data");
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading data mata kuliah...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        Gagal mengambil data mata kuliah
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Data Mata Kuliah</h1>

        <Link
          to="/admin/matakuliah/tambah"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Tambah Mata Kuliah
        </Link>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Kode</th>
              <th className="border p-2">Nama Mata Kuliah</th>
              <th className="border p-2">SKS</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {currentMatkul.length > 0 ? (
              currentMatkul.map((item) => (
                <tr key={item.id}>
                  <td className="border p-2">{item.id}</td>
                  <td className="border p-2">{item.kode}</td>
                  <td className="border p-2">{item.nama}</td>
                  <td className="border p-2">{item.sks}</td>

                  <td className="border p-2">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/matakuliah/edit/${item.id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
