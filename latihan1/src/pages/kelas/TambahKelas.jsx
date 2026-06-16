import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useKelas, useCreateKelas } from "../../utils/hooks/useKelas";
import { useDosen } from "../../utils/hooks/useDosen";
import { useMahasiswa } from "../../utils/hooks/useMahasiswa";
import { useMataKuliah } from "../../utils/hooks/useMataKuliah";

export default function TambahKelas() {
  const navigate = useNavigate();

  const { data: kelas = [] } = useKelas();
  const { data: dosen = [] } = useDosen();
  const { data: mahasiswa = [] } = useMahasiswa();
  const { data: matakuliah = [] } = useMataKuliah();

  const createKelas = useCreateKelas();

  const [form, setForm] = useState({
    namaKelas: "",
    matakuliahId: "",
    dosenId: "",
    mahasiswaIds: [],
  });

  const handleMahasiswa = (id) => {
    if (form.mahasiswaIds.includes(id)) {
      setForm({
        ...form,
        mahasiswaIds: form.mahasiswaIds.filter((m) => m !== id),
      });
    } else {
      setForm({
        ...form,
        mahasiswaIds: [...form.mahasiswaIds, id],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // =====================
    // VALIDASI INPUT
    // =====================

    if (!form.namaKelas || !form.matakuliahId || !form.dosenId) {
      alert("Lengkapi data terlebih dahulu");
      return;
    }

    const selectedMK = matakuliah.find(
      (m) => String(m.id) === String(form.matakuliahId),
    );

    if (!selectedMK) {
      alert("Pilih mata kuliah");
      return;
    }

    const sksMK = Number(selectedMK.sks);

    // =====================
    // VALIDASI 1 MK = 1 DOSEN
    // =====================

    const mkSudahDipakai = kelas.find(
      (k) => String(k.matakuliahId) === String(form.matakuliahId),
    );

    if (mkSudahDipakai) {
      alert("Mata kuliah ini sudah digunakan pada kelas lain");
      return;
    }

    // =====================
    // VALIDASI DOSEN MAX SKS
    // =====================

    const dosenDipilih = dosen.find(
      (d) => String(d.id) === String(form.dosenId),
    );

    let totalSKSDosen = 0;

    const kelasDosen = kelas.filter(
      (k) => String(k.dosenId) === String(form.dosenId),
    );

    kelasDosen.forEach((k) => {
      const mk = matakuliah.find(
        (m) => String(m.id) === String(k.matakuliahId),
      );

      totalSKSDosen += Number(mk?.sks || 0);
    });

    if (totalSKSDosen + sksMK > Number(dosenDipilih.maxSKS)) {
      alert(
        `Dosen ${dosenDipilih.nama} melebihi batas ${dosenDipilih.maxSKS} SKS`,
      );
      return;
    }

    // =====================
    // VALIDASI MAHASISWA MAX SKS
    // =====================

    for (const mhsId of form.mahasiswaIds) {
      const mahasiswaDipilih = mahasiswa.find(
        (m) => String(m.id) === String(mhsId),
      );

      let totalSKSMahasiswa = 0;

      kelas.forEach((k) => {
        if (k.mahasiswaIds && k.mahasiswaIds.includes(mhsId)) {
          const mk = matakuliah.find(
            (x) => String(x.id) === String(k.matakuliahId),
          );

          totalSKSMahasiswa += Number(mk?.sks || 0);
        }
      });

      if (totalSKSMahasiswa + sksMK > Number(mahasiswaDipilih.maxSKS)) {
        alert(
          `${mahasiswaDipilih.nama} melebihi batas ${mahasiswaDipilih.maxSKS} SKS`,
        );

        return;
      }
    }

    // =====================
    // SIMPAN DATA
    // =====================

    try {
      await createKelas.mutateAsync({
        ...form,
        id: Date.now().toString(),
      });

      alert("Kelas berhasil dibuat");

      navigate("/admin/kelas");
    } catch (error) {
      console.error(error);
      alert("Gagal membuat kelas");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Tambah Kelas</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nama Kelas"
          className="border p-2 rounded w-full"
          value={form.namaKelas}
          onChange={(e) =>
            setForm({
              ...form,
              namaKelas: e.target.value,
            })
          }
        />

        <select
          className="border p-2 rounded w-full"
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
          className="border p-2 rounded w-full"
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
              {d.nama} (Max {d.maxSKS} SKS)
            </option>
          ))}
        </select>

        <div>
          <h3 className="font-semibold mb-2">Pilih Mahasiswa</h3>

          <div className="border rounded p-3 max-h-60 overflow-y-auto">
            {mahasiswa.map((m) => (
              <label key={m.id} className="block py-1">
                <input
                  type="checkbox"
                  checked={form.mahasiswaIds.includes(m.id)}
                  onChange={() => handleMahasiswa(m.id)}
                />

                <span className="ml-2">
                  {m.nama} ({m.nim}) - Max {m.maxSKS} SKS
                </span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Simpan Kelas
        </button>
      </form>
    </div>
  );
}
