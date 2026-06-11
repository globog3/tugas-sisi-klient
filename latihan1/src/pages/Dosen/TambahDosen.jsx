import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function TambahDosen() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    nidn: "",
  });

  const submitData = async (e) => {
    e.preventDefault();

    await api.post("/dosen", form);

    navigate("/dosen");
  };

  return (
    <form onSubmit={submitData}>
      <input
        placeholder="Nama"
        onChange={(e) =>
          setForm({
            ...form,
            nama: e.target.value,
          })
        }
      />

      <input
        placeholder="NIDN"
        onChange={(e) =>
          setForm({
            ...form,
            nidn: e.target.value,
          })
        }
      />

      <button type="submit">Simpan</button>
    </form>
  );
}

export default TambahDosen;
