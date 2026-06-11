import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuClass = (path) =>
    `block px-6 py-3 rounded-lg ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-white hover:bg-blue-700"
    }`;

  return (
    <div className="w-64 h-screen bg-blue-900 text-white fixed">
      <div className="p-6 text-xl font-bold">Admin</div>

      <nav className="px-4 space-y-2">
        <Link to="/admin" className={menuClass("/admin")}>
          Dashboard
        </Link>

        <Link to="/admin/mahasiswa" className={menuClass("/admin/mahasiswa")}>
          Mahasiswa
        </Link>

        <Link to="/admin/dosen" className={menuClass("/admin/dosen")}>
          Dosen
        </Link>

        <Link to="/admin/matakuliah" className={menuClass("/admin/matakuliah")}>
          Mata Kuliah
        </Link>

        <Link to="/admin/register" className={menuClass("/admin/register")}>
          Registrasi User
        </Link>
      </nav>
    </div>
  );
}
