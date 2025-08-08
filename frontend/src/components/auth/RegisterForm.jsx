import { Errores } from "../../lib/errores.js";
import { useForm } from "react-hook-form";
import useEnterNavigation from "../../hooks/use-enter-navigation.jsx";
import { useApp } from "../../hooks/use-app.jsx";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/use-auth.jsx";
import { useState } from "react";

function RegisterForm() {
  const { info, loading } = useApp();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEnterNavigation("#Form");

  const onSubmit = async (data) => {
    setLoginError(null); // clear previous errors
    const { username, password } = data;
    const [error, response] = await login({ username, password });

    if (error) {
      setLoginError("Credenciales incorrectas. Inténtalo nuevamente.");
      reset(undefined, { keepErrors: true });
      return;
    }

    if (info.url === "/") {
      navigate("/users");
    } else {
      const url = `${info.url}?token=${response.token}`;
      window.location.replace(url);
    }
  };

  return (
    <form
      id="Form"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md bg-white p-8 rounded-xl shadow-md"
    >
      <div className="flex flex-col items-center">
        <img src="./summasoft.svg" alt="Logo SummaSoft" className="w-48 mb-4" />
        {loading ? (
          <div className="flex flex-col items-center animate-pulse my-4">
            <div className="w-24 h-24 rounded-full bg-gray-300 mb-4" />
            <div className="w-40 h-6 bg-gray-300 rounded mb-6" />
          </div>
        ) : (
          <>
            <img src={info.icon} alt="App Icon" className="w-24 h-24 my-4" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {info.name}
            </h2>
          </>
        )}
      </div>

      {loginError && (
        <p className="text-red-600 text-sm mb-4 text-center">{loginError}</p>
      )}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Nombre de Usuario"
          autoFocus
          className={`w-full px-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 ${
            errors.username
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
          {...register("username", { required: true })}
          aria-invalid={errors.username ? "true" : "false"}
        />
        {errors.username && (
          <p className="text-red-600 text-xs mt-1">
            {Errores["Missing username"]}
          </p>
        )}
      </div>

      <div className="mb-4">
        <input
          type="password"
          placeholder="Contraseña"
          className={`w-full px-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 ${
            errors.password
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
          {...register("password", { required: true })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && (
          <p className="text-red-600 text-xs mt-1">
            {Errores["Missing password"]}
          </p>
        )}
      </div>

      <div className="mb-6">
        <input
          type="password"
          placeholder="Contraseña"
          className={`w-full px-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 ${
            errors.password
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
          {...register("confirm-password", { required: true })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && (
          <p className="text-red-600 text-xs mt-1">
            {Errores["Missing password"]}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 cursor-pointer transition-colors duration-200"
      >
        Registrarse
      </button>
      <div className="text-center w-full">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-blue-600 font-semibold hover:underline cursor-pointer p-1 mt-2"
        >
          Iniciar Sesión
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
