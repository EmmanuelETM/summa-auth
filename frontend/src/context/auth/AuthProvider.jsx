import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";
import authApi from "../../api/auth.js";

const initialAuth = {
  authenticated: false,
  token: "",
  username: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialAuth);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const { search } = useLocation();
  const navigate = useNavigate();

  const isAuthApp = search === "";

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setAuth(initialAuth);
    navigate("/");
  }, [navigate]);

  const logoutRef = useRef(logout);
  useEffect(() => {
    logoutRef.current = logout;
  }, [logout]);

  const runVerify = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    let ok = false;

    if (token) {
      const [error, data] = await authApi.verify(token);

      if (!error && data?.token?.username === "admin") {
        setAuth({
          authenticated: true,
          token,
          username: data.token.username,
        });
        ok = true;
      } else {
        localStorage.removeItem("token");
        setAuth(initialAuth);
      }
    }

    setVerified(true);
    setLoading(false);
    return ok;
  }, []);

  const didInit = useRef(false);
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    runVerify();
  }, [runVerify]);

  const handleAuth = useCallback(
    async ({ token = "" } = {}) => {
      const validToken = token && token.length > 1 ? token : null;

      if (!validToken) {
        logoutRef.current();
        return;
      }

      localStorage.setItem("token", validToken);
      setLoading(true);
      await runVerify();
    },
    [runVerify]
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

    await handleAuth({ token: data.token });
    return [null, data];
  };

  const value = {
    auth,
    login,
    logout,
    loading,
    verified,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
