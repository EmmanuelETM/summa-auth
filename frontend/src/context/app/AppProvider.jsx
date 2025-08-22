import { useState, useEffect } from "react";
import { AppContext } from "./AppContext.jsx";
import { defaultApp } from "../../lib/defaultApp.js";
import App from "../../api/app.js";

export const AppProvider = ({ children, app }) => {
  const [info, setInfo] = useState(defaultApp);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function setAppInfo(name) {
      if (!name || name.length === 0) return;

      setLoading(true);
      try {
        const [error, data] = await App.info(name);

        if (error) {
          setInfo(defaultApp);
        }

        setInfo(data);
      } catch (err) {
        console.error("Failed to fetch app info:", err);
        setInfo(defaultApp);
      } finally {
        setLoading(false);
      }
    }

    setAppInfo(app);
  }, [app]);

  const value = { info, setInfo, loading };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
