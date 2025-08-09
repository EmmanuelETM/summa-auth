import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";
import authApi from "../../api/auth.js";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    authenticated: false,
    token: "",
    username: null,
  });
  const [loading, setLoading] = useState(false);
  const { search } = useLocation();
  const navigate = useNavigate();
  const isAuthApp = search !== "" ? false : true;

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setAuth({ authenticated: false, token: "", username: null });
    navigate("/");
  }, [navigate]);

  const verify = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return false;
    }

    const [error, data] = await authApi.verify(token);

    if (error || !data) {
      logout();
      setLoading(false);
      return false;
    }

    const isAdmin = data.token.username === "admin";

    if (!isAdmin) {
      logout();
      setLoading(false);
      return false;
    }

    setAuth((prev) => ({
      ...prev,
      authenticated: true,
      token,
      username: data.token.username,
    }));

    setLoading(false);
    return true;
  }, [logout]);

  const handleAuth = useCallback(
    ({ token = "", username } = {}) => {
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
          username,
        }));
      } else {
        logout();
      }
    },
    [logout]
  );

  const login = async ({
    username,
    password,
    app = isAuthApp ? "auth" : "",
  }) => {
    const [error, data] = await authApi.login({ username, password, app });

    if (error || !data?.token) {
      return [error || "Invalid login", null];
    }

    if (isAuthApp) {
      handleAuth({ token: data.token, username });
    }
    return [null, data];
  };

  useEffect(() => {
    verify();
  }, [verify]);

  const value = { auth, login, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
