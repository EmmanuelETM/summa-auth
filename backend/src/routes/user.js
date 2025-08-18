import { Router } from "express";
import { UsersController } from "../controllers/user.js";
import validate from "../middlewares/validateRequest.js";
import request from "./schemas/user.js";

const router = Router();
const usersController = new UsersController();

router.get("/", usersController.getAll);

router.patch("/:username", validate(request.update), usersController.update);
router.patch(
  "/:username/password",
  validate(request.updatePassword),
  usersController.updatePassword
);

router.post("/import", usersController.import);

export default router;
