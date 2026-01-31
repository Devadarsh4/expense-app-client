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

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  /* ================= EMAIL LOGIN ================= */
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5001/auth/login",
        formData,
        { withCredentials: true }
      );

      setUser(response.data.user);
      navigate("/dashboard");
    } catch (error) {
      setErrors({
        message:
          error.response?.data?.message || "Login failed",
      });
    }
  };

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/auth/google-auth", // ✅ FIXED
        { idToken: credentialResponse.credential },
        { withCredentials: true }
      );

      setUser(response.data.user);
      navigate("/dashboard");
    } catch (error) {
      setErrors({ message: "Google login failed" });
    }
  };

  return (
    <div className="container text-center">
      <h3>Login to continue</h3>

      {errors.message && (
        <div className="alert alert-danger">{errors.message}</div>
      )}

      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary w-100 mb-3">
          Login
        </button>
      </form>

      <hr />

      {/* 🔐 GOOGLE LOGIN */}
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() =>
          setErrors({ message: "Google Login Failed" })
        }
      />
    </div>
  );
}

export default Login;
