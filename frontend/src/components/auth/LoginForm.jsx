import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router";
import { useApp } from "../../hooks/use-app.jsx";
import { useAuth } from "../../hooks/use-auth.jsx";
import { Errores, ErrorMapper } from "../../lib/errores.js";
import { Input } from "../Input.jsx";
import { Button } from "../Button.jsx";
import { LoadingIcon } from "../Loading.jsx";

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
          <LoadingIcon />
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
        <Input
          name="username"
          autoFocus
          placeholder="Nombre de Usuario"
          register={register("username", {
            required: Errores["Missing username"],
          })}
          error={errors.username}
          aria-invalid={errors.username ? "true" : "false"}
        />
      </div>

      <div className="mb-6">
        <Input
          name="password"
          type="password"
          placeholder="Contraseña"
          register={register("password", {
            required: Errores["Missing password"],
          })}
          error={errors.password}
          aria-invalid={errors.password ? "true" : "false"}
        />

        <div className="mt-2">
          <Link
            className="text-sky-700 font-semibold hover:underline"
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

      <Button
        text={submitting ? "Iniciando..." : "Iniciar Sesión"}
        type="submit"
        disabled={submitting}
        className={"w-full"}
      />

      <div className="text-center w-full mt-2">
        <Link
          className="text-sky-700 font-semibold hover:underline"
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
