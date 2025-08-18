import { Router } from "express";
import { AuthController } from "../controllers/auth.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { authSchema } from "./schemas/authSchema.js";

export const createAuthRouter = ({ UsersModel }) => {
  const router = Router();
  const authController = new AuthController({ UsersModel });

  router.get("/portal", authController.portal);

  router.post(
    "/register",
    validateRequest(authSchema.register),
    authController.register
  );
  router.post(
    "/login",
    validateRequest(authSchema.login),
    authController.login
  );
  router.post(
    "/authenticate",
    validateRequest(authSchema.authenticate),
    authController.authenticate
  );
  router.post(
    "/verify",
    validateRequest(authSchema.verify),
    authController.verify
  );

  return router;
};
