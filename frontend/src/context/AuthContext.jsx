import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("cms_user")) || null
  );
  const [token, setToken] = useState(
    () => localStorage.getItem("cms_token") || null
  );

  useEffect(() => {
    if (user && token) {
      localStorage.setItem("cms_user", JSON.stringify(user));
      localStorage.setItem("cms_token", token);
    } else {
      localStorage.removeItem("cms_user");
      localStorage.removeItem("cms_token");
    }
  }, [user, token]);

  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
