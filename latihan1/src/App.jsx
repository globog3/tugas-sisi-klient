import { BrowserRouter, Routes, Route } from "react-router-dom";

// AUTH
import Login from "./pages/Login";
import RegisterPage from "./pages/Register/RegisterPage";

// ADMIN
import Dashboard from "./pages/admin/Dashboard";
import Mahasiswa from "./pages/admin/Mahasiswa";
import DetailMahasiswa from "./pages/admin/DetailMahasiswa";

// DOSEN
import DosenPage from "./pages/Dosen/DosenPage";
import TambahDosen from "./pages/Dosen/TambahDosen";
import EditDosen from "./pages/Dosen/EditDosen";

// MATA KULIAH
import MataKuliahPage from "./pages/MataKuliah/MataKuliahPage";
import TambahMataKuliah from "./pages/MataKuliah/TambahMataKuliah";
import EditMataKuliah from "./pages/MataKuliah/EditMataKuliah";

// KELAS
import KelasPage from "./pages/Kelas/KelasPage";
import TambahKelas from "./pages/Kelas/TambahKelas";
import EditKelas from "./pages/Kelas/EditKelas";

// USER RBAC
import UserPage from "./pages/admin/UserPage";

// LAYOUT
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ==========================
            PUBLIC ROUTES
        ========================== */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ==========================
            ADMIN ROUTES
        ========================== */}
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

          {/* MAHASISWA */}
          <Route path="mahasiswa" element={<Mahasiswa />} />

          <Route path="mahasiswa/:nim" element={<DetailMahasiswa />} />

          {/* DOSEN */}
          <Route path="dosen" element={<DosenPage />} />

          <Route path="dosen/tambah" element={<TambahDosen />} />

          <Route path="dosen/edit/:id" element={<EditDosen />} />

          {/* MATA KULIAH */}
          <Route path="matakuliah" element={<MataKuliahPage />} />

          <Route path="matakuliah/tambah" element={<TambahMataKuliah />} />

          <Route path="matakuliah/edit/:id" element={<EditMataKuliah />} />

          {/* KELAS */}
          <Route path="kelas" element={<KelasPage />} />

          <Route path="kelas/tambah" element={<TambahKelas />} />

          <Route path="kelas/edit/:id" element={<EditKelas />} />

          {/* USER RBAC */}
          <Route path="users" element={<UserPage />} />
        </Route>

        {/* ==========================
            NOT FOUND
        ========================== */}
        <Route
          path="*"
          element={
            <div className="p-10 text-center">
              <h1 className="text-3xl text-red-600 font-bold">404</h1>

              <p>Page Not Found</p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
