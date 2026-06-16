import { useState, useEffect } from "react";
import MahasiswaTable from "./MahasiswaTable";
import MahasiswaModal from "./MahasiswaModal";
import Pagination from "../../components/Pagination";

import {
  useMahasiswa,
  useCreateMahasiswa,
  useUpdateMahasiswa,
  useDeleteMahasiswa,
} from "../../utils/hooks/useMahasiswa";

import { showSuccess, showError } from "../../helpers/toast";

export default function Mahasiswa() {
  const { data: mahasiswa = [] } = useMahasiswa();

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentMahasiswa = mahasiswa.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(mahasiswa.length / itemsPerPage);

  const create = useCreateMahasiswa();
  const update = useUpdateMahasiswa();
  const remove = useDeleteMahasiswa();

  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data) => {
    try {
      if (selected) {
        await update.mutateAsync({
          id: selected.id,
          data,
        });
        showSuccess("Berhasil update");
      } else {
        await create.mutateAsync(data);
        showSuccess("Berhasil tambah");
      }

      setOpen(false);
    } catch {
      showError("Gagal proses data");
    }
  };

  const handleDelete = async (id) => {
    try {
      await remove.mutateAsync(id);
      showSuccess("Berhasil hapus");
    } catch {
      showError("Gagal hapus");
    }
  };

  return (
    <div>
      <button onClick={() => setOpen(true)}>+ Tambah</button>

      <MahasiswaTable
        mahasiswa={currentMahasiswa}
        onEdit={(data) => {
          setSelected(data);
          setOpen(true);
        }}
        onDelete={handleDelete}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      {open && (
        <MahasiswaModal
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
          selected={selected}
        />
      )}
    </div>
  );
}
