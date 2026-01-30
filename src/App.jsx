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

  const isUserLoggedIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/auth/is-user-loggedin",
        {},
        { withCredentials: true }
      );
      setUserDetails(response.data.user);
    } catch {
      setUserDetails(null);
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

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
