import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getCurrentUserRole } from "../services/AuthService";
import "../styles/Login.css"; // Import the CSS file

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting to log in with:", email, password);
      const success = await login(email, password);

      if (success) {
        const userRole = getCurrentUserRole();
        console.log("User role:", userRole);

        if (userRole === "admin") {
          setMessage("Admin logged in");
          navigate("/");
        } else if (userRole === "customer") {
          setMessage("Customer logged in");
          navigate("/");
        } else {
          setMessage("Unknown user role");
          console.error("Unknown user role:", userRole);
        }
        onLogin(); // Update authentication state
      } else {
        setMessage("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Left Side - Login Form */}
        <div className="login-form">
          <h2 className="fw-bold mb-4">Welcome Back Admin!</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="custom-label">Admin Email</label>
              <input
                type="email"
                className="custom-input"
                placeholder="Enter your Admin Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="custom-label">Admin Password</label>
              <input
                type="password"
                className="custom-input"
                placeholder="Enter your Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* <a href="#" className="text-primary text-decoration-none small d-block mt-1">
                Forgot your password?
              </a> */}
            </div>
            <button className="btn btn-dark w-100" type="submit">
              Admin-Login
            </button>
          </form>

          {message && <p className="mt-3 text-center text-danger">{message}</p>}

          {/* <div className="text-center my-3">or</div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary flex-grow-1">
              <i className="bi bi-facebook"></i> Facebook
            </button>
            <button className="btn btn-outline-danger flex-grow-1">
              <i className="bi bi-google"></i> Google
            </button>
          </div>
          <div className="text-center mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-primary text-decoration-none">
              Create account
            </a>
          </div> */}
        </div>

        {/* Right Side - Image */}
        <div className="login-image">
          <img
            src="/img/back.png"
            alt="Flowers"
            className="img-fluid rounded-end h-100"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
