export default function MahasiswaTable({ mahasiswa, openEditModal, onDelete }) {
  return (
    <table className="w-full border">
      <thead className="bg-blue-800 text-white">
        <tr>
          <th className="p-2">NIM</th>
          <th className="p-2">Nama</th>
          <th className="p-2">Status</th>
          <th className="p-2">Aksi</th>
        </tr>
      </thead>

      <tbody>
        {mahasiswa.map((m) => (
          <tr key={m.nim} className="border">
            <td className="p-2">{m.nim}</td>
            <td className="p-2">{m.nama}</td>
            <td className="p-2">{m.status ? "Aktif" : "Nonaktif"}</td>
            <td className="p-2 space-x-2">
              <button
                onClick={() => openEditModal(m)}
                className="bg-yellow-400 px-2 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(m.nim)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
