// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Llamada al endpoint correcto de tu backend
      const response = await API.post("/auth/signin", { email, password });

      // Guardar token en localStorage
      localStorage.setItem("token", response.data.token);

      // Redirigir a la lista de clientes (página protegida)
      navigate("/clientes");
    } catch (err) {
      console.error("Error en login:", err);
      setError(
        err.response?.data?.message ||
        "Error al iniciar sesión. Verifica tu correo y contraseña."
      );
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
        >
          Iniciar Sesión
        </button>
        {error && (
          <p>
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;