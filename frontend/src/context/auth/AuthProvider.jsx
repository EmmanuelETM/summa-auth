import { useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import authApi from "../../api/auth.js";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    authenticated: false,
    token: "",
    user: null,
  });

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setAuth({ authenticated: false, token: "", user: null });
    window.location.href = "http://localhost:5173";
  }, []);

  const handleAuth = useCallback(
    ({ token = "" } = {}) => {
      const tokenFromStorage = localStorage.getItem("token");

      const validToken =
        token && token.length > 1
          ? token
          : tokenFromStorage && tokenFromStorage.length > 1
          ? tokenFromStorage
          : null;

      if (validToken) {
        localStorage.setItem("token", validToken);
        setAuth((prev) => ({
          ...prev,
          authenticated: true,
          token: validToken,
        }));
      } else {
        logout();
      }
    },
    [logout]
  );

  const login = async ({ username, password }) => {
    const [error, data] = await authApi.login(username, password);

    if (error || !data?.token) {
      return [error || "Invalid login", null];
    }

    handleAuth({ token: data.token });
    return [null, data];
  };

  const verify = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const [error, data] = await authApi.verify(token);
    if (error || !data) {
      logout();
      return false;
    }

    setAuth({
      authenticated: true,
      token,
      user: authApi.user,
    });

    return true;
  }, [logout]);

  useEffect(() => {
    verify();
  }, [verify]);

  const value = { auth, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
