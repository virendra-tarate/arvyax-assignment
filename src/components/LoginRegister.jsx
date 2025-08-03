import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const LoginRegister = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        try {
            const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
            const res = await axios.post("http://localhost:5000" + endpoint, {
                email,
                password,
            });
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                setMessage("Login successful. Redirecting to dashboard...");
                setTimeout(() => (window.location.href = "/my-sessions"), 1500);
            } else {
                setMessage("Registration successful. Redirecting to dashboard...");
                setTimeout(() => (window.location.href = "/my-sessions"), 1500);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>{isLogin ? "Login" : "Register"}</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {message && <p style={{ color: "green" }}>{message}</p>}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">{isLogin ? "Login" : "Register"}</button>
                <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer", color: "#5b9bd5" }}>
                    {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                </p>
            </form>
        </div>
    );
};

export default LoginRegister;