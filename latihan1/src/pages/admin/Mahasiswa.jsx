import { useState } from "react";
import MahasiswaModal from "./MahasiswaModal";
import MahasiswaTable from "./MahasiswaTable";
import { confirmAlert } from "../../helpers/swal";
import { showSuccess, showError } from "../../helpers/toast";

export default function Mahasiswa() {
  // STATE UTAMA
  const [mahasiswa, setMahasiswa] = useState([
    { nim: "101", nama: "Adi", status: true },
    { nim: "102", nama: "Budi", status: false },
  ]);

  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // =========================
  // CRUD FUNCTION
  // =========================

  const storeMahasiswa = (data) => {
    setMahasiswa([...mahasiswa, data]);
  };

  const updateMahasiswa = (data) => {
    setMahasiswa(mahasiswa.map((m) => (m.nim === data.nim ? data : m)));
  };

  const deleteMahasiswa = (nim) => {
    setMahasiswa(mahasiswa.filter((m) => m.nim !== nim));
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
        updateMahasiswa(data);
        showSuccess("Data berhasil diupdate!");
      } catch {
        showError("Gagal update data!");
      }
    } else {
      try {
        storeMahasiswa(data);
        showSuccess("Data berhasil ditambahkan!");
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
      deleteMahasiswa(nim);
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
          className="bg-blue-600 text-white px-4 py-2 rounded"
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
