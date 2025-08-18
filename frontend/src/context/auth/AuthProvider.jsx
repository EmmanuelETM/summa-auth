import { useState, useEffect, useCallback } from "react";
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

  const verify = useCallback(async () => {
    setLoading(true);

    const token = localStorage.getItem("token");
    let success = false;

    if (token) {
      const [error, data] = await authApi.verify(token);

      if (!error && data?.token?.username === "admin") {
        setAuth({
          authenticated: true,
          token,
          username: data.token.username,
        });
        success = true;
      } else {
        logout();
      }
    }

    setLoading(false);
    setVerified(true);
    return success;
  }, [logout]);

  const handleAuth = useCallback(
    ({ token = "", username } = {}) => {
      const validToken = token && token.length > 1 ? token : null;

      if (validToken) {
        localStorage.setItem("token", validToken);
        setAuth({
          authenticated: true,
          token: validToken,
          username,
        });
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

  const value = {
    auth,
    login,
    logout,
    loading,
    verified,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
