import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";

import AppLayout from "./components/AppLayout";
import UserLayout from "./components/UserLayout";

function App() {
  const [userDetails, setUserDetails] = useState(null);

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUserDetails} />} />
      </Route>

      {/* Protected Routes */}
      {userDetails ? (
        <Route element={<UserLayout />}>
          <Route
            path="/dashboard"
            element={<Dashboard user={userDetails} />}
          />
          <Route
            path="/logout"
            element={<Logout setUser={setUserDetails} />}
          />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

export default App;
