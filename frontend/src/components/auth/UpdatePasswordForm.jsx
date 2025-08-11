import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { useApp } from "../../hooks/use-app.jsx";
import { Errores, ErrorMapper } from "../../lib/errores.js";
import { updatePassword } from "../../context/auth/authActions.js";
import { Message } from "../Message.jsx";

function UpdatePasswordForm() {
  const { info, loading } = useApp();
  const [searchParams] = useSearchParams();
  const [formError, setFormError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setFormError(null);
    setSubmitting(true);

    const { username, password, confirm } = data;

    if (password !== confirm) {
      setFormError("Las contraseñas no coinciden.");
      setSubmitting(false);
      return;
    }

    const [error, response] = await updatePassword({ username, password });
    setSubmitting(false);

    if (error) {
      setFormError(ErrorMapper(error));
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

      {formError && (
        <p className="text-red-600 text-sm mb-4 text-center">{formError}</p>
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

      <div className="mb-4">
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
      </div>

      <div className="mb-6">
        <label htmlFor="confirm" className="sr-only">
          Confirmar Contraseña
        </label>
        <input
          id="confirm"
          type="password"
          placeholder="Confirmar Contraseña"
          className={`w-full px-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 ${
            errors.confirm
              ? "border-red-500 focus:ring-red-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
          {...register("confirm", {
            required: Errores["Missing confirm"],
            validate: (value) =>
              value === password || "Las contraseñas no coinciden.",
          })}
          aria-invalid={errors.confirm ? "true" : "false"}
        />
        {errors.confirm && (
          <p className="text-red-600 text-xs mt-1">{errors.confirm.message}</p>
        )}
      </div>

      {success && (
        <Message
          type="success"
          message="Contraseña actualizada correctamente"
        />
      )}

      <button
        type="submit"
        disabled={submitting}
        className={`w-full py-2 font-semibold text-white rounded-md transition-colors duration-200 ${
          submitting
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {submitting ? "Actualizando..." : "Actualizar Contraseña"}
      </button>

      <div className="text-center w-full mt-2">
        <Link
          className="text-blue-600 font-semibold hover:underline"
          to={searchParams.size > 0 ? `/?${searchParams}` : "/"}
        >
          Iniciar Sesión
        </Link>
      </div>
    </form>
  );
}

export default UpdatePasswordForm;
