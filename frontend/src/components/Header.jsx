import { SidebarToggleButton } from "./Sidebar";
import { LogOut } from "lucide-react";
import { useLocation } from "react-router";

export function Header() {
  const location = useLocation();

  function formatTitle(title) {
    const clean = title.slice(1);
    return clean.charAt(0).toUpperCase() + clean.slice(1);
  }

  return (
    <header className="flex">
      <div className="w-full border-b border-zinc-200">
        <div className="h-16 flex items-center text-center justify-between px-3 pt-1 mx-auto">
          <div className="flex items-center gap-4 text-xl">
            <SidebarToggleButton />
            <h1 className="font-semibold">{formatTitle(location.pathname)}</h1>
          </div>
        </div>
      </div>
    </header>
  );
}
