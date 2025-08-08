import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./pages/auth/LoginPage";
import UsersPage from "./pages/dashboard/UsersPage";
import RegisterPage from "./pages/auth/RegisterPage";
import UpdatePasswordPage from "./pages/auth/UpdatePasswordPage";

function App() {
  // const [route, setRoute] = useState("register");

  const ROUTES = {
    users: <UsersPage />,
    login: <LoginPage />,
    register: <RegisterPage />,
    updatePassword: <UpdatePasswordPage />,
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="update-password" element={<UpdatePasswordPage />} />

          <Route path="/dashboard" element={<UsersPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
