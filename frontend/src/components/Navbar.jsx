import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0.75rem 2rem",
        background: "#222",
        color: "#fff"
      }}
    >
      <div>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          CMS
        </Link>
      </div>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: "1rem" }}>
              {user.name} ({user.role})
            </span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link
              to="/"
              style={{ color: "#fff", marginRight: "1rem", textDecoration: "none" }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
