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
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let err = {};
    if (!formData.email) err.email = "Email is required";
    if (!formData.password) err.password = "Password is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* ================= EMAIL LOGIN ================= */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        "http://localhost:5001/auth/login",
        formData,
        { withCredentials: true }
      );

      setUser(response.data.user);
      setMessage("Login successful");
      setErrors({});
      navigate("/dashboard");
    } catch (error) {
      setErrors({
        message:
          error.response?.data?.message ||
          "Login failed. Try again.",
      });
      setMessage("");
    }
  };

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/auth/google-login",
        {
          token: credentialResponse.credential,
        },
        { withCredentials: true }
      );

      setUser(response.data.user);
      navigate("/dashboard");
    } catch (error) {
      setErrors({ message: "Google login failed" });
    }
  };

  return (
    <div className="container text-center mt-5">
      <h3>Login to continue</h3>

      {errors.message && (
        <div className="alert alert-danger">{errors.message}</div>
      )}

      {message && (
        <div className="alert alert-success">{message}</div>
      )}

      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter email"
            onChange={handleChange}
          />
          {errors.email && (
            <div className="text-danger">{errors.email}</div>
          )}
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter password"
            onChange={handleChange}
          />
          {errors.password && (
            <div className="text-danger">{errors.password}</div>
          )}
        </div>

        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>
      </form>

      <hr />

      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() =>
          setErrors({ message: "Google login failed" })
        }
      />
    </div>
  );
}

export default Login;
