import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [register, setRegister] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    setLoading(true);
    const url = "http://localhost:1111/auth/login";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "PASS") {
          alert("Login successful!");
          // Fix incorrect key from `res.user.fullname` in Login handler
          localStorage.setItem("name", res.user.fullname);

          // Fix incorrect field name in register fetch body

          localStorage.setItem("token", res.token);
          navigate("/dashboard");
        } else {
          alert(res.message || "Login failed");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        alert("Error: " + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !password || !fullname) {
      alert("Please fill in all fields.");
      return;
    }
    setLoading(true);
    const url = "http://localhost:1111/auth/register";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Fix incorrect key from `res.user.fullname` in Login handler

      // Fix incorrect field name in register fetch body
      body: JSON.stringify({ fullname, email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === "PASS") {
          setMessage("Registration successful! Redirecting to login…");
          setTimeout(() => {
            setRegister(false);
            setMessage("");
            navigate("/");
          }, 2000);
        } else {
          alert(res.message || "Registration failed");
        }
      })
      .catch((err) => {
        alert("Error: " + err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ marginTop: "150px" }}
    >
      {register ? (
        <div
          className="card p-4 shadow"
          style={{ width: "100%", maxWidth: "500px" }}
        >
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="mt-3 d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setRegister(false)}
              >
                Register
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div
          className="card p-4 shadow"
          style={{ width: "100%", maxWidth: "500px" }}
        >
          <h2 className="text-center mb-4">Register</h2>
          {message && <div className="alert alert-success">{message}</div>}
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="form-control"
                placeholder="Enter your full name"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default Login;
