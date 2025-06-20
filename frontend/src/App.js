import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import EmployeeDashboard from "./EmployeeDashboard";
import Login from "./Login";
import ManagerDashboard from "./ManagerDashboard";

function AppRoutes({ loggedIn, role, handleLogin }) {
  return (
    <Routes>
      <Route path="/login" element={
        loggedIn ? <Navigate to={`/${role.toLowerCase()}`} /> : <Login onLogin={handleLogin} />
      } />
      <Route path="/admin" element={loggedIn && role === "ADMIN" ? <AdminDashboard /> : <Navigate to="/login" />} />
      <Route path="/manager" element={loggedIn && role === "MANAGER" ? <ManagerDashboard /> : <Navigate to="/login" />} />
      <Route path="/employee" element={loggedIn && role === "EMPLOYEE" ? <EmployeeDashboard /> : <Navigate to="/login" />} />
      {/* Default/fallback: if logged in, route to their dashboard; else to login */}
      <Route path="*" element={
        loggedIn
          ? <Navigate to={`/${role.toLowerCase()}`} />
          : <Navigate to="/login" />
      } />
    </Routes>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  const handleLogin = (userRole) => {
    setRole(userRole);
    setLoggedIn(true);
    // No need to redirect here: <Navigate /> in routes will handle it!
  };

  return (
    <BrowserRouter>
      <AppRoutes loggedIn={loggedIn} role={role} handleLogin={handleLogin} />
    </BrowserRouter>
  );
}
export default App;
