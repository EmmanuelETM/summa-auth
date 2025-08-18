import { useSidebar } from "../hooks/use-sidebar";
import { LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { NavLink, Link } from "react-router";
import { CircleGauge, User, AppWindow, Settings } from "lucide-react";
import { useAuth } from "../hooks/use-auth";

export const Sidebar = () => {
  const { isOpen, closeSidebar } = useSidebar();
  const { logout } = useAuth();

  return (
    <>
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 bg-black/30 z-30 transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        className={`
          fixed md:relative top-0 left-0 h-screen bg-zinc-100 border-r border-gray-300 z-40
          transition-all duration-300 overflow-hidden
          ${isOpen ? "w-52" : "w-0"}
        `}
      >
        <div
          className={`flex flex-col justify-between p-4 h-full ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div>
            <Link to="/dashboard">
              <img src="/summasoft.svg" alt="Logo SummaSoft" className="mb-6" />
            </Link>
            <nav className="mt-8">
              <ul className="space-y-2">
                <SidebarLink
                  to={"/dashboard"}
                  text={"Dashboard"}
                  Icon={CircleGauge}
                />
                <SidebarLink to={"/users"} text={"Users"} Icon={User} />
                <SidebarLink to={"/apps"} text={"Apps"} Icon={AppWindow} />
                <SidebarLink
                  to={"/settings"}
                  text={"Settings"}
                  Icon={Settings}
                />
              </ul>
            </nav>
          </div>
          <div>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-semibold duration-200 w-full hover:bg-zinc-200 hover:text-red-500 cursor-pointer"
              onClick={logout}
            >
              <LogOut /> Log Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

function SidebarLink({ to, Icon, text }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex gap-2 items-center px-3 py-2 rounded-md transition-colors duration-200 ${
            isActive
              ? "bg-sky-700 text-white font-medium"
              : "text-black hover:bg-zinc-200"
          }`
        }
      >
        {Icon && <Icon />}
        <h3 className="font-semibold">{text}</h3>
      </NavLink>
    </li>
  );
}

export const SidebarToggleButton = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  return (
    <button onClick={toggleSidebar} className="p-1 rounded hover:bg-gray-200">
      {isOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
    </button>
  );
};
