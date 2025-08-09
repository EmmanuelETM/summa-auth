import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router";
import useEnterNavigation from "../../hooks/use-enter-navigation.jsx";
import { useApp } from "../../hooks/use-app.jsx";
import { useAuth } from "../../hooks/use-auth.jsx";
import { Errores, ErrorMapper } from "../../lib/errores.js";

function LoginForm() {
  const { info, loading } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [loginError, setLoginError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEnterNavigation("#Form");

  const onSubmit = async (data) => {
    setSubmitting(true);
    setLoginError(null);
    const { username, password } = data;

    const [error, response] = await login({
      username,
      password,
      app: info.alias,
    });
    setSubmitting(false);

    if (error) {
      setLoginError(ErrorMapper(error));
      reset(undefined, { keepErrors: true });
      return;
    }

    if (info.url === "/") {
      navigate("/dashboard");
    } else {
      const url = `${info.url}?token=${response.token}`;
      window.open(url, "_top");
    }
  };

  return (
    <form
      id="Form"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md bg-white p-8 rounded-xl shadow-md"
    >
      <div className="flex flex-col items-center">
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
        <label htmlFor="username" className="sr-only">
          Nombre de Usuario
        </label>
        <input
          id="username"
          type="text"
          placeholder="Nombre de Usuario"
          autoFocus
          className={`w-full px-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 ${
            errors.username
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
          {...register("username", {
            required: Errores["Missing username"],
          })}
          aria-invalid={errors.username ? "true" : "false"}
        />
        {errors.username && (
          <p className="text-red-600 text-xs mt-1">{errors.username.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="sr-only">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          placeholder="Contraseña"
          className={`w-full px-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 ${
            errors.password
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
          {...register("password", {
            required: Errores["Missing password"],
          })}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && (
          <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
        )}

        <div className="mt-2">
          <Link
            className="text-blue-600 font-semibold hover:underline"
            to={
              searchParams.size > 0
                ? `/update-password/?${searchParams}`
                : "/update-password"
            }
          >
            ¿Se te olvidó la contraseña?
          </Link>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`w-full py-2 font-semibold text-white rounded-md transition-colors duration-200 ${
          submitting
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {submitting ? "Iniciando..." : "Iniciar Sesión"}
      </button>

      <div className="text-center w-full mt-2">
        <Link
          className="text-blue-600 font-semibold hover:underline"
          to={
            searchParams.size > 0 ? `/register/?${searchParams}` : "/register"
          }
        >
          Registrarse
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
