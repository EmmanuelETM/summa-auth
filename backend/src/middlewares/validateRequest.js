import config from "../../config.js";
import { schemaValidator } from "../helpers/schemaValidator.js";

export const validateRequest = (schema, auth) => (req, res, next) => {
  const validation = schemaValidator(schema, req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      status: "error",
      message: "Bad request",
      ...(config.MODE === "development" && { errors: validation.errors }),
    });
  }

  next();
};
