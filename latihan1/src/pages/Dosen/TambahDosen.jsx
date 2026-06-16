import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateDosen } from "../../utils/hooks/useDosen";

export default function TambahDosen() {
  const navigate = useNavigate();

  const create = useCreateDosen();

  const [form, setForm] = useState({
    nama: "",
    matakuliah: "",
    maxSKS: 12,
  });

  const submit = async (e) => {
    e.preventDefault();

    if (!form.nama || !form.matakuliah) {
      alert("Semua data wajib diisi");
      return;
    }

    try {
      await create.mutateAsync({
        ...form,
        maxSKS: Number(form.maxSKS),
      });

      alert("Dosen berhasil ditambahkan");

      navigate("/admin/dosen");
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan dosen");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Tambah Dosen</h1>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Nama Dosen
            </label>

            <input
              type="text"
              placeholder="Masukkan nama dosen"
              value={form.nama}
              onChange={(e) =>
                setForm({
                  ...form,
                  nama: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Mata Kuliah
            </label>

            <input
              type="text"
              placeholder="Masukkan mata kuliah"
              value={form.matakuliah}
              onChange={(e) =>
                setForm({
                  ...form,
                  matakuliah: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Maksimal SKS
            </label>

            <input
              type="number"
              min="1"
              max="24"
              value={form.maxSKS}
              onChange={(e) =>
                setForm({
                  ...form,
                  maxSKS: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Simpan
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/dosen")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
