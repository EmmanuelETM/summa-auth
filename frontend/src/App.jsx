import { Routes, Route } from "react-router";
import { AuthLayout } from "./components/layouts/AuthLayout";
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import UpdatePasswordPage from "./pages/auth/UpdatePasswordPage";
import DashBoardPage from "./pages/dashboard/DashboardPage";
import UsersPage from "./pages/dashboard/UsersPage";
import AppsPage from "./pages/dashboard/AppsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import NotFoundPage from "./pages/404";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        {/* <Route path="update-password" element={<UpdatePasswordPage />} /> */}
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

export default App;
