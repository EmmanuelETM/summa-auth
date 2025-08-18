import { Router } from "express";
import { UserController } from "../controllers/userController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { userSchema } from "./schemas/userSchema.js";

export const createUserRouter = ({ UserModel }) => {
  const router = Router();
  const userController = new UserController({ UserModel });

  router.get("/", userController.getAll);

  router.patch(
    "/:username",
    validateRequest({ schema: userSchema.update }),
    userController.update
  );
  router.patch(
    "/:username/password",
    validateRequest({ schema: userSchema.updatePassword }),
    userController.updatePassword
  );

  router.post("/import", userController.import);

  return router;
};
