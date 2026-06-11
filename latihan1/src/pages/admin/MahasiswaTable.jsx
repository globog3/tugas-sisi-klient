export default function MahasiswaTable({
  mahasiswa = [],
  openEditModal,
  onDelete,
}) {
  const dataMahasiswa = Array.isArray(mahasiswa) ? mahasiswa : [];

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg">
      <table className="w-full border-collapse">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-3 text-left">NIM</th>
            <th className="p-3 text-left">Nama</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {dataMahasiswa.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-6 text-gray-500">
                Tidak ada data mahasiswa
              </td>
            </tr>
          ) : (
            dataMahasiswa.map((m) => (
              <tr key={m.id || m.nim} className="border-b hover:bg-gray-50">
                <td className="p-3">{m.nim}</td>
                <td className="p-3">{m.nama}</td>

                <td className="p-3 text-center">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      m.status
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {m.status ? "Aktif" : "Nonaktif"}
                  </span>
                </td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => openEditModal(m)}
                    className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(m.nim)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
