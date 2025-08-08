// validateToken.js
import config from "../../config.js";
import keysModel from "../models/keysModel.js";

const bearer = () => async (req, res, next) => {
  const bearer = req.headers.authorization;

  // Si no tiene el bearer...
  if (!bearer) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized",
      ...(config.MODE === "development" && { errors: "Missing Authorization" }),
    });
  }
  // Extraer el token
  const token = bearer.split(" ")[1];
  console.log(token);

  // Si no tiene el bearer...

  const key = await keysModel.getOne({ key: token });
  //   console.log(key);
  if (!key) {
    return res.status(401).json({
      status: "error",
      message: "Unauthorized",
      ...(config.MODE === "development" && { errors: "Invalid Authorization" }),
    });
  }

  next();
};

export default bearer;
