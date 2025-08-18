import { Router } from "express";
import { UsersController } from "../controllers/user.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { userSchema } from "./schemas/userSchema.js";

export const createUsersRouter = ({ UsersModel }) => {
  const router = Router();
  const usersController = new UsersController({ UsersModel });

  router.get("/", usersController.getAll);

  router.patch(
    "/:username",
    validateRequest(userSchema.update),
    usersController.update
  );
  router.patch(
    "/:username/password",
    validateRequest(userSchema.updatePassword),
    usersController.updatePassword
  );

  router.post("/import", usersController.import);

  return router;
};
