export const Errores = {
  "Missing username": "Ingrese el nombre de usuario",
  "Missing password": "Ingrese la contraseña",
  "Missing email": "Ingrese el Email",
  "Missing confirm": "Vuelva a ingresar la contraseña",
  "Failed to fetch": "Servicio no disponible",
  Unauthorized: "No autorizado",
  "The username or password is incorrect":
    "Nombre de usuario o contraseña incorrectos.",
  default: "Nombre de usuario o contraseña incorrectos.",
};

export const ErrorMapper = (rawError) => {
  if (!rawError) return Errores.default;
  return Errores[rawError] || Errores.default;
};
