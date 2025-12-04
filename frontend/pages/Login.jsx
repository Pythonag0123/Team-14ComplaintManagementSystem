import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api, { setAuthToken } from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.user, res.data.token);
      setAuthToken(res.data.token);

      if (res.data.user.role === "ADMIN") navigate("/admin/dashboard");
      else if (res.data.user.role === "AGENT") navigate("/agent/dashboard");
      else navigate("/user/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Login</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        New user? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
