import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverEndpoint } from "../config/appConfig";

function Logout({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(
          `${serverEndpoint}/auth/logout`,
          {},
          { withCredentials: true }
        );

        setUser(null);

        // ✅ REDIRECT AFTER LOGOUT
        navigate("/");
      } catch (error) {
        console.log("Logout failed:", error);
        navigate("/");
      }
    };

    logout();
  }, [navigate, setUser]);

  return <p>Logging out...</p>;
}

export default Logout;
