import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { useApp } from "../../hooks/use-app.jsx";
import { Errores, ErrorMapper } from "../../lib/errores.js";
import { updatePassword } from "../../context/auth/authActions.js";
import { Message } from "../Message.jsx";
import { LoadingIcon } from "../Loading.jsx";

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

      {formError && (
        <p className="text-red-600 text-sm mb-4 text-center">{formError}</p>
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

      <div className="mb-4">
        <Input
          name="password"
          type="password"
          placeholder="Confirmar Contraseña"
          register={register("password", {
            required: Errores["Missing password"],
          })}
          error={errors.confirm}
          aria-invalid={errors.confirm ? "true" : "false"}
        />
      </div>

      <div className="mb-6">
        <Input
          name="confirm"
          type="password"
          placeholder="Confirmar Contraseña"
          register={register("confirm", {
            required: Errores["Missing confirm"],
            validate: (value) =>
              value === password || "Las contraseñas no coinciden.",
          })}
          error={errors.confirm}
          aria-invalid={errors.confirm ? "true" : "false"}
        />
      </div>

      {success && (
        <Message
          type="success"
          message="Contraseña actualizada correctamente"
        />
      )}

      <Button
        text={submitting ? "Actualizando..." : "Actualizar Contraseña"}
        type="submit"
        disabled={submitting}
        className={"w-full"}
      />

      <div className="text-center w-full mt-2">
        <Link
          className="text-sky-600 font-semibold hover:underline"
          to={searchParams.size > 0 ? `/?${searchParams}` : "/"}
        >
          Iniciar Sesión
        </Link>
      </div>
    </form>
  );
}

export default UpdatePasswordForm;
