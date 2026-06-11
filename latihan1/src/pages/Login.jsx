import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Card from "../components/molecules/Card";
import Form from "../components/molecules/Form";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import Label from "../components/atoms/Label";
import api from "../services/api";
import { showSuccess, showError } from "../helpers/toast";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 🔥 ambil data dari json-server
      const res = await api.get(
        `/users?username=${username}&password=${password}`,
      );

      const user = res.data[0];

      if (!user) {
        showError("Username atau password salah!");
        return;
      }

      // 🔐 SIMPAN SESSION (INI PENTING)
      localStorage.setItem("user", JSON.stringify(user));

      showSuccess("Login berhasil!");

      // 🚀 REDIRECT BERDASARKAN ROLE
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/mahasiswa");
      }
    } catch (error) {
      console.error(error);
      showError("Terjadi kesalahan server!");
    }
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-96">
          <h1 className="text-center text-2xl font-bold text-blue-600 mb-6">
            Login
          </h1>

          <Form onSubmit={handleSubmit}>
            {/* USERNAME */}
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* PASSWORD */}
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* BUTTON */}
            <Button size="full" variant="primary">
              Login
            </Button>
          </Form>
        </Card>
      </div>
    </AuthLayout>
  );
}
