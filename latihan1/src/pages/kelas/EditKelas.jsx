import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useKelas, useUpdateKelas } from "../../utils/hooks/useKelas";
import { useDosen } from "../../utils/hooks/useDosen";
import { useMahasiswa } from "../../utils/hooks/useMahasiswa";
import { useMataKuliah } from "../../utils/hooks/useMataKuliah";

export default function EditKelas() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: kelas = [] } = useKelas();
  const { data: dosen = [] } = useDosen();
  const { data: mahasiswa = [] } = useMahasiswa();
  const { data: matakuliah = [] } = useMataKuliah();

  const updateKelas = useUpdateKelas();

  const [form, setForm] = useState({
    namaKelas: "",
    matakuliahId: "",
    dosenId: "",
    mahasiswaIds: [],
  });

  useEffect(() => {
    const selected = kelas.find((k) => String(k.id) === String(id));

    if (selected) {
      setForm(selected);
    }
  }, [kelas, id]);

  const handleMahasiswa = (idMahasiswa) => {
    if (form.mahasiswaIds.includes(idMahasiswa)) {
      setForm({
        ...form,
        mahasiswaIds: form.mahasiswaIds.filter((m) => m !== idMahasiswa),
      });
    } else {
      setForm({
        ...form,
        mahasiswaIds: [...form.mahasiswaIds, idMahasiswa],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedMK = matakuliah.find(
      (m) => String(m.id) === String(form.matakuliahId),
    );

    const selectedDosen = dosen.find(
      (d) => String(d.id) === String(form.dosenId),
    );

    if (!selectedMK) {
      alert("Pilih Mata Kuliah");
      return;
    }

    if (!selectedDosen) {
      alert("Pilih Dosen");
      return;
    }

    // Mata kuliah tidak boleh dipakai kelas lain
    const mkDipakai = kelas.find(
      (k) =>
        k.id !== id && String(k.matakuliahId) === String(form.matakuliahId),
    );

    if (mkDipakai) {
      alert("Mata Kuliah sudah digunakan kelas lain");
      return;
    }

    // Validasi SKS Dosen
    const totalSKSDosen = kelas
      .filter((k) => k.id !== id && String(k.dosenId) === String(form.dosenId))
      .reduce((total, k) => {
        const mk = matakuliah.find(
          (m) => String(m.id) === String(k.matakuliahId),
        );

        return total + (mk?.sks || 0);
      }, 0);

    if (totalSKSDosen + selectedMK.sks > (selectedDosen.maxSKS || 12)) {
      alert("SKS Dosen melebihi batas");
      return;
    }

    // Validasi SKS Mahasiswa
    for (const mahasiswaId of form.mahasiswaIds) {
      const mhs = mahasiswa.find((m) => String(m.id) === String(mahasiswaId));

      const totalSKSMhs = kelas
        .filter((k) => k.id !== id && k.mahasiswaIds?.includes(mahasiswaId))
        .reduce((total, k) => {
          const mk = matakuliah.find(
            (m) => String(m.id) === String(k.matakuliahId),
          );

          return total + (mk?.sks || 0);
        }, 0);

      if (totalSKSMhs + selectedMK.sks > (mhs?.maxSKS || 24)) {
        alert(`Mahasiswa ${mhs.nama} melebihi batas SKS`);
        return;
      }
    }

    try {
      await updateKelas.mutateAsync({
        id,
        data: form,
      });

      alert("Data berhasil diupdate");

      navigate("/admin/kelas");
    } catch (error) {
      console.error(error);
      alert("Gagal update");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Edit Kelas</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Nama Kelas"
          value={form.namaKelas}
          onChange={(e) =>
            setForm({
              ...form,
              namaKelas: e.target.value,
            })
          }
        />

        <select
          className="border p-2 w-full"
          value={form.matakuliahId}
          onChange={(e) =>
            setForm({
              ...form,
              matakuliahId: e.target.value,
            })
          }
        >
          <option value="">Pilih Mata Kuliah</option>

          {matakuliah.map((mk) => (
            <option key={mk.id} value={mk.id}>
              {mk.nama} ({mk.sks} SKS)
            </option>
          ))}
        </select>

        <select
          className="border p-2 w-full"
          value={form.dosenId}
          onChange={(e) =>
            setForm({
              ...form,
              dosenId: e.target.value,
            })
          }
        >
          <option value="">Pilih Dosen</option>

          {dosen.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nama}
            </option>
          ))}
        </select>

        <div>
          <h3 className="font-semibold mb-2">Mahasiswa</h3>

          {mahasiswa.map((m) => (
            <label key={m.id} className="block">
              <input
                type="checkbox"
                checked={form.mahasiswaIds.includes(m.id)}
                onChange={() => handleMahasiswa(m.id)}
              />

              <span className="ml-2">{m.nama}</span>
            </label>
          ))}
        </div>

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
