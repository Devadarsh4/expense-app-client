import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";

import AppLayout from "./components/AppLayout";
import UserLayout from "./components/UserLayout";

function App() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ FIX

  const isUserLoggedIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/auth/is-user-logged-in", // ✅ FIX
        {},
        { withCredentials: true }
      );
      setUserDetails(response.data.user);
    } catch (error) {
      setUserDetails(null);
    } finally {
      setLoading(false); // ✅ VERY IMPORTANT
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  // ⛔ WAIT until auth check finishes
  if (loading) {
    return (
      <div className="container text-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUserDetails} />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<UserLayout />}>
        <Route
          path="/dashboard"
          element={
            userDetails ? (
              <Dashboard user={userDetails} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/logout"
          element={
            userDetails ? (
              <Logout setUser={setUserDetails} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
