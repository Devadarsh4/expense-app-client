import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

function Login({ setUser }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= EMAIL LOGIN ================= */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5001/auth/login",
        formData,
        { withCredentials: true }
      );

      // ✅ make sure backend returns user
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      if (!credentialResponse?.credential) {
        setError("Google token missing");
        return;
      }

      const res = await axios.post(
        "http://localhost:5001/auth/google-auth",
        {
          idToken: credentialResponse.credential, // ✅ must match backend
        },
        { withCredentials: true }
      );

      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google login failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "420px" }}>
      <h3 className="text-center mb-3">Login to continue</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleFormSubmit}>
        <input
          className="form-control mb-3"
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary w-100 mb-3" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="text-center mb-2">OR</div>

      <div className="d-flex justify-content-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => setError("Google login failed")}
        />
      </div>
    </div>
  );
}

export default Login;
