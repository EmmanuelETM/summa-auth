import { Router } from "express";
import { AuthController } from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { authSchema } from "./schemas/authSchema.js";

export const createAuthRouter = ({ UserModel }) => {
  const router = Router();
  const authController = new AuthController({ UserModel });

  router.get("/portal", authController.portal);

  router.post(
    "/register",
    validateRequest({ schema: authSchema.register }),
    authController.register
  );
  router.post(
    "/login",
    validateRequest({ schema: authSchema.login }),
    authController.login
  );
  router.post(
    "/authenticate",
    validateRequest({ schema: authSchema.authenticate }),
    authController.authenticate
  );
  router.post(
    "/verify",
    validateRequest({ schema: authSchema.verify }),
    authController.verify
  );

  return router;
};
