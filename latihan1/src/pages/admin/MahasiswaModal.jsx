import { useState, useEffect } from "react";

export default function MahasiswaModal({
  isModalOpen,
  onClose,
  onSubmit,
  selectedMahasiswa,
  mahasiswa,
}) {
  const [form, setForm] = useState({
    nim: "",
    nama: "",
    status: true,
  });

  // =========================
  // USE EFFECT (AUTO FILL)
  // =========================
  useEffect(() => {
    if (selectedMahasiswa) {
      setForm(selectedMahasiswa);
    } else {
      setForm({
        nim: "",
        nama: "",
        status: true,
      });
    }
  }, [selectedMahasiswa, isModalOpen]);

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    // VALIDASI
    if (!form.nim || !form.nama) {
      alert("Data harus lengkap!");
      return;
    }

    // VALIDASI NIM UNIQUE (SAAT TAMBAH)
    const isDuplicate = mahasiswa.some(
      (m) =>
        m.nim === form.nim &&
        (!selectedMahasiswa || m.nim !== selectedMahasiswa.nim),
    );

    if (isDuplicate) {
      alert("NIM sudah ada!");
      return;
    }

    onSubmit(form);
    onClose();
  };

  // =========================
  // CLOSE MODAL
  // =========================
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-lg font-bold mb-4">
          {selectedMahasiswa ? "Edit" : "Tambah"} Mahasiswa
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nim"
            placeholder="NIM"
            value={form.nim}
            onChange={handleChange}
            disabled={selectedMahasiswa}
            className="w-full border p-2 mb-2"
          />

          <input
            type="text"
            name="nama"
            placeholder="Nama"
            value={form.nama}
            onChange={handleChange}
            className="w-full border p-2 mb-2"
          />

          <label className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              name="status"
              checked={form.status}
              onChange={handleChange}
            />
            Aktif
          </label>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-3 py-1 rounded"
            >
              Batal
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
