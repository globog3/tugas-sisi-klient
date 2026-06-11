import { useParams } from "react-router-dom";

export default function DetailMahasiswa() {
  const { nim } = useParams();

  return (
    <div>
      <h1 className="text-xl font-bold">Detail Mahasiswa</h1>
      <p>NIM: {nim}</p>
    </div>
  );
}
