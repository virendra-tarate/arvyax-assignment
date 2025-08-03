import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="container">
            <nav>
                <h2>Wellness App</h2>
                {isLoggedIn && (
                    <>
                        <Link to="/">Dashboard</Link> | <Link to="/my-sessions">My Sessions</Link> | <Link to="/editor">Editor</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
            </nav>
        </div>
    );
};

export default Navbar;