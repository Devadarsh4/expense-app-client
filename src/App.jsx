import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Groups from "./pages/Groups";
import Logout from "./pages/Logout";

import UserLayout from "./components/UserLayout";

import { serverEndpoint } from "./config/appConfig";
import { SET_USER } from "./redux/user/action";

function App() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = Boolean(userDetails?._id);

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
        if (error.response?.status !== 401) {
          console.error(error);
        }
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
      {/* 🔓 PUBLIC LOGIN (NO LAYOUT) */}
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
        }
      />

      {/* 🔐 PRIVATE ROUTES (WITH UserLayout) */}
      <Route
        element={
          isAuthenticated ? <UserLayout /> : <Navigate to="/login" />
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/groups" element={<Groups />} />
      </Route>

      {/* 🚪 LOGOUT */}
      <Route path="/logout" element={<Logout />} />

      {/* ❌ FALLBACK */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
