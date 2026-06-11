import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Card from "../components/molecules/Card";
import Form from "../components/molecules/Form";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import Label from "../components/atoms/Label";
import users from "../data/user.json";
import { showSuccess, showError } from "../helpers/toast";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.username === username && u.password === password,
    );

    if (user) {
      localStorage.setItem("isLogin", "true");
      showSuccess("Login berhasil!");
      navigate("/admin");
    } else {
      showError("Login gagal!");
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

            {/* REMEMBER ME */}
            <div className="flex justify-between items-center text-sm mb-4">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-blue-600"
                />
                Ingat saya
              </label>

              <span className="text-blue-500 cursor-pointer hover:underline">
                Lupa password?
              </span>
            </div>

            {/* BUTTON */}
            <Button size="full" variant="primary">
              Login
            </Button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Belum punya akun?
              <span className="text-blue-500 hover:underline ml-1 cursor-pointer">
                Daftar
              </span>
            </p>
          </Form>
        </Card>
      </div>
    </AuthLayout>
  );
}
