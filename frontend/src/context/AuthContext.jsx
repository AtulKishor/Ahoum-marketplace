import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (tokens) => {
    localStorage.setItem("auth", JSON.stringify(tokens));
    setAuth(tokens);

    const res = await api.get("auth/me/", {
      headers: {
        Authorization: `Bearer ${tokens.access}`,
      },
    });

    const updated = { ...tokens, user: res.data };
    setAuth(updated);
    localStorage.setItem("auth", JSON.stringify(updated));
    return updated;
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
        setAuth(JSON.parse(stored));
    }
    }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
