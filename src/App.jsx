import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import Groups from "./pages/Groups";

import UserLayout from "./components/UserLayout";
import AppLayout from "./components/AppLayout";

import { serverEndpoint } from "./config/appConfig";
import { SET_USER } from "./redux/user/action";

function App() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const [loading, setLoading] = useState(true);

  // ✅ Check if user already logged in
  useEffect(() => {
    const isUserLoggedIn = async () => {
      try {
        const response = await axios.post(
          `${serverEndpoint}/auth/is-user-logged-in`,
          {},
          { withCredentials: true }
        );

        dispatch({
          type: SET_USER,
          payload: response.data.user,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    isUserLoggedIn();
  }, [dispatch]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <Routes>
      {/* 🔐 LOGIN */}
      <Route
        path="/login"
        element={
          userDetails ? (
            <Navigate to="/dashboard" />
          ) : (
            <AppLayout>
              <Login />
            </AppLayout>
          )
        }
      />

      {/* 📊 DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          userDetails ? (
            <UserLayout>
              <Dashboard />
            </UserLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* 👥 GROUPS */}
      <Route
        path="/groups"
        element={
          userDetails ? (
            <UserLayout>
              <Groups />
            </UserLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* 🚪 LOGOUT */}
      <Route
        path="/logout"
        element={
          userDetails ? <Logout /> : <Navigate to="/login" />
        }
      />

      {/* ❌ FALLBACK */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
