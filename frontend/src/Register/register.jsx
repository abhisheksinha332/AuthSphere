import { useState } from "react";
import api from "../api/axios";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {           await api.post("/auth/register", {
                name,
                email,
                password
            });
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