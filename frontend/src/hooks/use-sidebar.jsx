import { useContext } from "react";
import { SidebarContext } from "../context/sidebar/SidebarContext";

export const useSidebar = () => useContext(SidebarContext);
