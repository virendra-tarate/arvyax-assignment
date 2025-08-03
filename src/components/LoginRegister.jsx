import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const LoginRegister = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
            const res = await axios.post("http://localhost:5000" + endpoint, {
                email,
                password,
            });
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                window.location.href = "/my-sessions";
            } else {
                alert(res.data.message);
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