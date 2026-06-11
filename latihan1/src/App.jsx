import { BrowserRouter, Routes, Route } from "react-router-dom";

// AUTH
import Login from "./pages/Login";
import RegisterPage from "./pages/Register/RegisterPage";

// ADMIN PAGES
import Dashboard from "./pages/admin/Dashboard";
import Mahasiswa from "./pages/admin/Mahasiswa";
import DetailMahasiswa from "./pages/admin/DetailMahasiswa";

// DOSEN & MATKUL
import DosenPage from "./pages/Dosen/DosenPage";
import MataKuliahPage from "./pages/MataKuliah/MataKuliahPage";

// RBAC USER MANAGEMENT
import UserPage from "./pages/admin/UserPage";

// LAYOUT & PROTECTED ROUTE
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            PUBLIC ROUTES
        ========================= */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* =========================
            ADMIN ROUTES (PROTECTED)
        ========================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* DASHBOARD */}
          <Route index element={<Dashboard />} />

          {/* MAHASISWA (FULL CRUD REACT QUERY) */}
          <Route path="mahasiswa" element={<Mahasiswa />} />
          <Route path="mahasiswa/:nim" element={<DetailMahasiswa />} />

          {/* DOSEN (READ ONLY REACT QUERY) */}
          <Route path="dosen" element={<DosenPage />} />

          {/* MATA KULIAH (READ ONLY REACT QUERY) */}
          <Route path="matakuliah" element={<MataKuliahPage />} />

          {/* RBAC USER MANAGEMENT (ROLE & PERMISSION) */}
          <Route path="users" element={<UserPage />} />
        </Route>

        {/* =========================
            OPTIONAL: NOT FOUND
        ========================= */}
        <Route
          path="*"
          element={
            <div className="p-10 text-center text-red-500">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
