import { useState, useEffect } from "react";
import MahasiswaModal from "./MahasiswaModal";
import MahasiswaTable from "./MahasiswaTable";
import { confirmAlert } from "../../helpers/swal";
import { showSuccess, showError } from "../../helpers/toast";
import api from "../../services/api";

export default function Mahasiswa() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {
    fetchMahasiswa();
  }, []);

  const fetchMahasiswa = async () => {
    try {
      const res = await api.get("/mahasiswa");

      console.log("Response API:", res.data);

      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
          ? res.data.data
          : [];

      setMahasiswa(data);
    } catch (error) {
      console.error(error);
      setMahasiswa([]);
      showError("Gagal mengambil data mahasiswa!");
    }
  };

  // =========================
  // CRUD FUNCTION
  // =========================

  const storeMahasiswa = async (data) => {
    try {
      console.log("Data dikirim:", data);

      const response = await api.post("/mahasiswa", data);

      console.log("Response:", response.data);

      await fetchMahasiswa();
    } catch (error) {
      console.error("Store Error:", error);

      if (error.response) {
        console.log(error.response.data);
      }

      throw error;
    }
  };

  const updateMahasiswa = async (data) => {
    try {
      const item = mahasiswa.find((m) => m.nim === selectedMahasiswa.nim);

      if (!item) return;

      await api.put(`/mahasiswa/${item.id}`, data);

      fetchMahasiswa();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteMahasiswa = async (nim) => {
    try {
      const item = mahasiswa.find((m) => m.nim === nim);

      if (!item) return;

      await api.delete(`/mahasiswa/${item.id}`);

      fetchMahasiswa();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // =========================
  // MODAL CONTROL
  // =========================

  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setModalOpen(true);
  };

  const openEditModal = (data) => {
    setSelectedMahasiswa(data);
    setModalOpen(true);
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (data) => {
    if (selectedMahasiswa) {
      const confirm = await confirmAlert(
        "Update Data?",
        "Yakin ingin mengubah data?",
      );

      if (!confirm) return;

      try {
        await updateMahasiswa(data);

        showSuccess("Data berhasil diupdate!");

        setModalOpen(false);
      } catch {
        showError("Gagal update data!");
      }
    } else {
      try {
        await storeMahasiswa(data);

        showSuccess("Data berhasil ditambahkan!");

        setModalOpen(false);
      } catch {
        showError("Gagal menambahkan data!");
      }
    }
  };

  const handleDelete = async (nim) => {
    const confirm = await confirmAlert(
      "Hapus Data?",
      "Data tidak bisa dikembalikan!",
    );

    if (!confirm) return;

    try {
      await deleteMahasiswa(nim);

      showSuccess("Data berhasil dihapus!");
    } catch {
      showError("Gagal menghapus data!");
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Daftar Mahasiswa</h1>

        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Tambah Mahasiswa
        </button>
      </div>

      {/* TABLE */}
      <MahasiswaTable
        mahasiswa={mahasiswa}
        openEditModal={openEditModal}
        onDelete={handleDelete}
      />

      {/* MODAL */}
      <MahasiswaModal
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
        mahasiswa={mahasiswa}
      />
    </div>
  );
}
