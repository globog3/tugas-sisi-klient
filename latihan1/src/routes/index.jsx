import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";

import Dashboard from "../pages/admin/Dashboard";
import Mahasiswa from "../pages/admin/Mahasiswa";
import DetailMahasiswa from "../pages/admin/DetailMahasiswa";

import DosenPage from "../pages/Dosen/DosenPage";
import TambahDosen from "../pages/Dosen/TambahDosen";
import EditDosen from "../pages/Dosen/EditDosen";

import MataKuliahPage from "../pages/MataKuliah/MataKuliahPage";
import TambahMataKuliah from "../pages/MataKuliah/TambahMataKuliah";
import EditMataKuliah from "../pages/MataKuliah/EditMataKuliah";

import RegisterPage from "../pages/Register/RegisterPage";

import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
        </Route>

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Mahasiswa */}
          <Route path="mahasiswa" element={<Mahasiswa />} />
          <Route path="mahasiswa/:nim" element={<DetailMahasiswa />} />

          {/* Dosen */}
          <Route path="dosen" element={<DosenPage />} />
          <Route path="dosen/tambah" element={<TambahDosen />} />
          <Route path="dosen/edit/:id" element={<EditDosen />} />

          {/* Mata Kuliah */}
          <Route path="matakuliah" element={<MataKuliahPage />} />
          <Route path="matakuliah/tambah" element={<TambahMataKuliah />} />
          <Route path="matakuliah/edit/:id" element={<EditMataKuliah />} />

          {/* Registrasi User */}
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
