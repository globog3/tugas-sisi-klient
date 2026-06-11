import { useNavigate } from "react-router-dom";
import { confirmAlert } from "../../helpers/swal";
import { showSuccess } from "../../helpers/toast";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirm = await confirmAlert("Logout?", "Yakin ingin keluar?");

    if (!confirm) return;

    localStorage.removeItem("isLogin");
    showSuccess("Berhasil logout!");
    navigate("/");
  };

  return (
    <div className="ml-64 h-16 bg-white shadow flex items-center justify-end px-6 gap-4">
      {/* Tombol Logout */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>

      {/* Avatar */}
      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
    </div>
  );
}
