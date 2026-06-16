import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useUpdateMataKuliah } from "../../utils/hooks/useMataKuliah";

export default function EditMataKuliah() {
  const { id } = useParams();

  const navigate = useNavigate();

  const update = useUpdateMataKuliah();

  const [form, setForm] = useState({
    kode: "",
    nama: "",
    sks: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get(`/matakuliah/${id}`);

      setForm(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await update.mutateAsync({
        id,
        data: form,
      });

      alert("Data berhasil diupdate");

      navigate("/admin/matakuliah");
    } catch (error) {
      console.error(error);
      alert("Gagal update data");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Mata Kuliah</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="border p-2 w-full"
          value={form.kode}
          onChange={(e) =>
            setForm({
              ...form,
              kode: e.target.value,
            })
          }
        />

        <input
          type="text"
          className="border p-2 w-full"
          value={form.nama}
          onChange={(e) =>
            setForm({
              ...form,
              nama: e.target.value,
            })
          }
        />

        <input
          type="number"
          className="border p-2 w-full"
          value={form.sks}
          onChange={(e) =>
            setForm({
              ...form,
              sks: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}
