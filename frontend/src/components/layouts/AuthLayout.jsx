import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../../hooks/use-auth";
import { Loading } from "../Loading";

export function AuthLayout() {
  const { auth, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && auth.authenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [loading, auth.authenticated, navigate]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen relative bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 left-4">
        <img src="/summasoft.svg" alt="Logo SummaSoft" className="w-48" />
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}
