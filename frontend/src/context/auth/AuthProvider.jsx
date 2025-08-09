import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";
import authApi from "../../api/auth.js";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    authenticated: false,
    token: "",
    user: null,
  });
  const [loading, setLoading] = useState(false);
  const { search } = useLocation();
  const navigate = useNavigate();
  const isAuthApp = search !== "" ? false : true;

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setAuth({ authenticated: false, token: "", user: null });
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

    setAuth({
      authenticated: true,
      token,
      user: authApi.user,
    });

    setLoading(false);
    return true;
  }, [logout]);

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

    if (isAuthApp) {
      handleAuth({ token: data.token });
    }
    return [null, data];
  };

  // console.log(auth);
  useEffect(() => {
    verify();
  }, [verify]);

  const value = { auth, login, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
