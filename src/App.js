import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginRegister from "./components/LoginRegister";
import Dashboard from "./components/Dashboard";
import MySessions from "./components/MySessions";
import SessionEditor from "./components/SessionEditor";
import Navbar from "./components/Navbar";

const App = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginRegister />} />
        <Route
          path="/"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/my-sessions"
          element={isLoggedIn ? <MySessions /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/editor"
          element={isLoggedIn ? <SessionEditor /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
