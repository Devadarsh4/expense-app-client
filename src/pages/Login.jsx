import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";

import { serverEndpoint } from "../config/appConfig";
import { SET_USER } from "../redux/user/action";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= EMAIL LOGIN ================= */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post(
        `${serverEndpoint}/auth/login`,
        formData,
        { withCredentials: true }
      );

      dispatch({
        type: SET_USER,
        payload: response.data.user,
      });

      navigate("/dashboard");
    } catch (error) {
      setErrors({
        message: error.response?.data?.message || "Login failed",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= GOOGLE LOGIN ================= */
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(
        `${serverEndpoint}/auth/google-auth`,
        { idToken: credentialResponse.credential },
        { withCredentials: true }
      );

      dispatch({
        type: SET_USER,
        payload: response.data.user,
      });

      navigate("/dashboard");
    } catch (error) {
      setErrors({ message: "Google login failed" });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "360px" }}>
        <h4 className="text-center mb-3">Login to continue</h4>

        {errors.message && (
          <div className="alert alert-danger">{errors.message}</div>
        )}

        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <hr />

        <div className="d-flex justify-content-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() =>
              setErrors({ message: "Google Login Failed" })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
