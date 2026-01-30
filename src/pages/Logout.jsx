import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    setUser(null);        // ✅ userDetails = null
    navigate("/login");  // redirect
  }, []);

  return <p>Logging out...</p>;
}

export default Logout;
