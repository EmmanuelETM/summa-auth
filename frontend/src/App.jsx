import { Routes, Route } from "react-router";
import { AuthLayout } from "./components/layouts/AuthLayout";
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashBoardPage from "./pages/protected/dashboard/DashboardPage";
import UsersPage from "./pages/protected/users/UsersPage";
import AppsPage from "./pages/protected/apps/AppsPage";
import SettingsPage from "./pages/protected/SettingsPage";
import NotFoundPage from "./pages/404";

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route index path="dashboard" element={<DashBoardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="apps" element={<AppsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
