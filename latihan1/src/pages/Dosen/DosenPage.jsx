import { useEffect, useState } from "react";
import api from "../../services/api";

function DosenPage() {
  const [dosen, setDosen] = useState([]);

  const getData = async () => {
    const res = await api.get("/dosen");
    setDosen(res.data);
  };

  const hapusData = async (id) => {
    await api.delete(`/dosen/${id}`);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Data Dosen</h1>

      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>NIDN</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {dosen.map((item) => (
            <tr key={item.id}>
              <td>{item.nama}</td>
              <td>{item.nidn}</td>
              <td>
                <button>Edit</button>

                <button onClick={() => hapusData(item.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DosenPage;
