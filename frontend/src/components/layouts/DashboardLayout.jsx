import { useEffect, useRef } from "react";
import { Outlet } from "react-router";
import { useAuth } from "../../hooks/use-auth";
import { Loading } from "../Loading";
import { SidebarProvider } from "../../context/sidebar/SidebarProvider";
import { Sidebar } from "../Sidebar";
import { Header } from "../Header";

export function DashboardLayout() {
  const { auth, logout, loading, verified } = useAuth();
  const firstRender = useRef(true);

  useEffect(() => {
    if (verified && !auth.authenticated) {
      logout();
    }
    firstRender.current = false;
  }, [auth.authenticated, verified, logout]);

  if ((loading || !verified) && firstRender.current) {
    return <Loading />;
  }

  return (
    <SidebarProvider>
      <LayoutWithSidebar />
    </SidebarProvider>
  );
}

function LayoutWithSidebar() {
  return (
    <div className="flex h-screen transition-all duration-300">
      <Sidebar />
      <div className="flex-1  ">
        <Header />
        <main className="p-4 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
