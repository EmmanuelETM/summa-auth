import { useEffect } from "react";
import { Outlet } from "react-router";
import { useAuth } from "../../hooks/use-auth";
import { Loading } from "../Loading";

export function DashboardLayout() {
  const { auth, logout, loading } = useAuth();

  useEffect(() => {
    if (!loading && !auth.authenticated) {
      logout();
    }
  }, [auth.authenticated, loading, logout]);

  if (loading) {
    return <Loading />;
  }

  return <Outlet />;
}
