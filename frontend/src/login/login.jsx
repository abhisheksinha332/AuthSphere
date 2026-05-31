import { useState } from "react";
import api from "../api/axios";

export default function Login({ onSuccess = () => {} }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password
      });

      if (response && response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        onSuccess();
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}