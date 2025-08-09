import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AppProvider } from "./context/app/AppProvider.jsx";
import { AuthProvider } from "./context/auth/AuthProvider.jsx";

function getAppName() {
  const search = window.location.search;
  const searchParams = new URLSearchParams(search);
  const appname = searchParams.get("app");
  return appname;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppProvider app={getAppName()}>
          <App />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
