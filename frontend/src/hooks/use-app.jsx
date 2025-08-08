import { useContext } from "react";
import { AppContext } from "../context/app/AppContext";

export const useApp = () => useContext(AppContext);
