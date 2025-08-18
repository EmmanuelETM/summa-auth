import { useEffect, useRef } from "react";
import { Outlet } from "react-router";
import { useAuth } from "../../hooks/use-auth";
import { LoadingPage } from "../Loading";
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
    return <LoadingPage />;
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
      {/* Sidebar never shrinks */}
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-auto p-4 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
