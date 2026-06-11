import { useEffect, useState } from "react";
import api from "../../services/api";

function MataKuliahPage() {
  const [mk, setMk] = useState([]);

  const getData = async () => {
    const res = await api.get("/matakuliah");
    setMk(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Data Mata Kuliah</h1>

      {mk.map((item) => (
        <div key={item.id}>
          {item.kode} - {item.nama}
        </div>
      ))}
    </div>
  );
}

export default MataKuliahPage;
