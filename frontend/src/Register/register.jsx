import { useState } from "react";
import api from "../api/axios";

export default function Register({ onSuccess = () => {} }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {           await api.post("/auth/register", {
                name,
                email,
                password
            });
            // After successful registration, auto-login the user
            try {
                const loginResp = await api.post('/auth/login', { email, password });
                if (loginResp && loginResp.data && loginResp.data.token) {
                    localStorage.setItem('token', loginResp.data.token);
                }
            } catch (err) {
                // Login after register failed; still call onSuccess so caller can react
                console.error('Auto-login failed after registration:', err);
            }

            onSuccess();
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <div>
            <input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
            />
            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleRegister}>
                Register
            </button>
        </div>
    );
}