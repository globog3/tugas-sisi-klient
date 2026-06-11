import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import Mahasiswa from "./pages/admin/Mahasiswa";
import DetailMahasiswa from "./pages/admin/DetailMahasiswa";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import DosenPage from "./pages/Dosen/DosenPage";
import MataKuliahPage from "./pages/MataKuliah/MataKuliahPage";
import RegisterPage from "./pages/Register/RegisterPage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dosen" element={<DosenPage />} />
        <Route path="/matakuliah" element={<MataKuliahPage />} />

        {/* TEST USER PAGE */}
        <Route path="/users" element={<UserPage />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="mahasiswa" element={<Mahasiswa />} />
          <Route path="mahasiswa/:nim" element={<DetailMahasiswa />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
