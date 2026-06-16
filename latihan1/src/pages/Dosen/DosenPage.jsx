import { Link } from "react-router-dom";
import { useState } from "react";
import Pagination from "../../components/Pagination";

import { useDosen, useDeleteDosen } from "../../utils/hooks/useDosen";

export default function DosenPage() {
  const { data: dosen = [] } = useDosen();
  const remove = useDeleteDosen();

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentData = dosen.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(dosen.length / itemsPerPage);

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus dosen ini?")) {
      remove.mutate(id);
    }
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Data Dosen</h1>
            <p className="text-gray-500 mt-1">Kelola data dosen kampus</p>
          </div>

          <Link
            to="/admin/dosen/tambah"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition"
          >
            + Tambah Dosen
          </Link>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Nama Dosen</th>
                <th className="p-4 text-left">Mata Kuliah</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {currentData.length > 0 ? (
                currentData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4">{firstIndex + index + 1}</td>

                    <td className="p-4 font-medium text-gray-800">
                      {item.nama}
                    </td>

                    <td className="p-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {item.matakuliah}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          to={`/admin/dosen/edit/${item.id}`}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-8 text-gray-500">
                    Belum ada data dosen
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* INFO */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-500 text-sm">Total Dosen : {dosen.length}</p>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
