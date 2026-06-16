import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useUpdateDosen } from "../../utils/hooks/useDosen";

export default function EditDosen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const update = useUpdateDosen();

  const [form, setForm] = useState({
    nama: "",
    matakuliah: "",
    maxSKS: 12,
  });

  useEffect(() => {
    api.get(`/dosen/${id}`).then((res) => {
      setForm(res.data);
    });
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await update.mutateAsync({
        id,
        data: form,
      });

      alert("Data dosen berhasil diupdate");
      navigate("/admin/dosen");
    } catch {
      alert("Gagal update dosen");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Dosen</h1>

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Nama Dosen
            </label>

            <input
              type="text"
              value={form.nama}
              onChange={(e) =>
                setForm({
                  ...form,
                  nama: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan nama dosen"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Mata Kuliah
            </label>

            <input
              type="text"
              value={form.matakuliah}
              onChange={(e) =>
                setForm({
                  ...form,
                  matakuliah: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan mata kuliah"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Maksimal SKS
            </label>

            <input
              type="number"
              value={form.maxSKS}
              onChange={(e) =>
                setForm({
                  ...form,
                  maxSKS: Number(e.target.value),
                })
              }
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
            >
              Update
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
