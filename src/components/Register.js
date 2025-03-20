import React, { useState } from "react";
import { register } from "../services/AuthService";
import "../styles/Login.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register(name, email, password);
      setMessage(response.message);
    } catch (error) {
      setMessage("Registration failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-form">
          <h1 className="fw-bold mb-4">Welcome!</h1>
          <p>Create an account to get started</p>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-dark w-100">
              Register
            </button>
          </form>
          {message && (
            <p className="ms-dark mt-3 text-center text-success">{message}</p>
          )}
          <div className="text-center mt-4">
            Already have an account{" "}
            <a href="/login" className="text-primary text-decoration-none">
              Login
            </a>
          </div>
        </div>
        <div className="login-image">
          <img src="img/back.png" alt="Flowers" />
        </div>
      </div>
    </div>
  );
};

export default Register;
