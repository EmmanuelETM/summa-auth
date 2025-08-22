import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { useApp } from "../../hooks/use-app.jsx";
import { register } from "../../context/auth/authActions.js";
import { Errores, ErrorMapper } from "../../lib/errores.js";
import { Message } from "../Message.jsx";
import { Input } from "../Input.jsx";
import { Button } from "../Button.jsx";
import { LoadingIcon } from "../Loading.jsx";

function RegisterForm() {
  const { info, loading } = useApp();
  const [searchParams] = useSearchParams();
  const [registerError, setRegisterError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setSubmitting(true);
    setRegisterError(null);

    const { username, email, password, confirm } = data;

    if (password !== confirm) {
      setRegisterError("Las contraseñas no coinciden.");
      setSubmitting(false);
      return;
    }

    const [error, response] = await register({ username, password, email });
    setSubmitting(false);

    if (error) {
      setRegisterError(ErrorMapper(error));
      reset(undefined, { keepErrors: true });
      return;
    }

    if (response.status === "ok") {
      setSuccess(true);
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

      {registerError && (
        <p className="text-red-600 text-sm mb-4 text-center">{registerError}</p>
      )}

      <div className="mb-4">
        <Input
          name="username"
          placeholder="Nombre de Usuario"
          autoFocus
          register={formRegister("username", {
            required: Errores["Missing username"],
          })}
          error={errors.username}
          aria-invalid={errors.username ? "true" : "false"}
        />
      </div>

      <div className="mb-4">
        <Input
          name="email"
          placeholder="Correo"
          autoFocus
          register={formRegister("email", {
            required: Errores["Missing email"],
          })}
          error={errors.email}
          aria-invalid={errors.email ? "true" : "false"}
        />
      </div>

      <div className="mb-4">
        <Input
          name="password"
          type="password"
          placeholder="Contraseña"
          register={formRegister("password", {
            required: Errores["Missing password"],
          })}
          error={errors.password}
          aria-invalid={errors.password ? "true" : "false"}
        />
      </div>

      <div className="mb-6">
        <Input
          name="confirm"
          type="password"
          placeholder="Confirmar Contraseña"
          register={formRegister("confirm", {
            required: Errores["Missing confirm"],
            validate: (value) =>
              value === password || "Las contraseñas no coinciden.",
          })}
          error={errors.confirm}
          aria-invalid={errors.confirm ? "true" : "false"}
        />
      </div>

      {success && (
        <Message type="success" message="Usuario creado exitosamente" />
      )}

      <Button
        text={submitting ? "Registrando..." : "Registrarse"}
        type="submit"
        disabled={submitting}
        className={"w-full"}
      />

      <div className="text-center w-full mt-2">
        <Link
          className="text-sky-700 font-semibold hover:underline"
          to={searchParams.size > 0 ? `/?${searchParams}` : "/"}
        >
          Iniciar Sesión
        </Link>
      </div>
    </form>
  );
}

export default RegisterForm;
