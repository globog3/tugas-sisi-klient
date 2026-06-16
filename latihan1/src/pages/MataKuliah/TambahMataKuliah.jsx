import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateMataKuliah } from "../../utils/hooks/useMataKuliah";

export default function TambahMataKuliah() {
  const navigate = useNavigate();

  const create = useCreateMataKuliah();

  const [form, setForm] = useState({
    kode: "",
    nama: "",
    sks: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await create.mutateAsync(form);

      alert("Data berhasil ditambahkan");

      navigate("/admin/matakuliah");
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan data");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Tambah Mata Kuliah</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Kode Mata Kuliah"
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
          placeholder="Nama Mata Kuliah"
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
          placeholder="SKS"
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
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
