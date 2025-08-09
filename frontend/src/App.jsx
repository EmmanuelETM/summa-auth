import { Routes, Route } from "react-router";
import LoginPage from "./pages/auth/LoginPage";
import UsersPage from "./pages/dashboard/UsersPage";
import RegisterPage from "./pages/auth/RegisterPage";
import UpdatePasswordPage from "./pages/auth/UpdatePasswordPage";
import { AuthLayout } from "./components/layouts/AuthLayout";
import { DashboardLayout } from "./components/layouts/DashboardLayout";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="update-password" element={<UpdatePasswordPage />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<UsersPage />} />
      </Route>
    </Routes>
  );
}

export default App;
