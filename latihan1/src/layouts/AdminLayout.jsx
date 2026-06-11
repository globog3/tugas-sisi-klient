import Header from "../components/organisms/Header";
import Sidebar from "../components/organisms/Sidebar";
import Footer from "../components/organisms/Footer";
import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout({ title = "" }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-64 bg-blue-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin</h2>

        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `block p-2 mb-2 rounded ${isActive ? "bg-blue-700" : ""}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/mahasiswa"
          className={({ isActive }) =>
            `block p-2 mb-2 rounded ${isActive ? "bg-blue-700" : ""}`
          }
        >
          Mahasiswa
        </NavLink>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col">
        <Header
          title={title}
          rightContent={
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          }
        />

        {/* 🔥 INI YANG PENTING */}
        <div className="p-6 flex-1 overflow-auto">
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
}
