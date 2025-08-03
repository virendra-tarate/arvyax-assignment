import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRegister from "./components/LoginRegister";
import Dashboard from "./components/Dashboard";
import MySessions from "./components/MySessions";
import SessionEditor from "./components/SessionEditor";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<LoginRegister />} />
      <Route path="/my-sessions" element={<MySessions />} />
      <Route path="/editor" element={<SessionEditor />} />
    </Routes>
  </Router>
);

export default App;