import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users", {
        ...form,
        role: "user",
      });

      alert("Registrasi Berhasil");

      // 🔥 FIX: login kamu ada di "/"
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Registrasi gagal");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        {/* USERNAME */}
        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({
              ...form,
              username: e.target.value,
            })
          }
        />

        <br />
        <br />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <br />
        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
