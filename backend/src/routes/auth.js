import { Router } from "express";
import { AuthController } from "../controllers/auth.js";
import validate from "../middlewares/validateRequest.js";
import request from "./schemas/auth.js";

const router = Router();
const authController = new AuthController();

router.get("/portal", authController.portal);

router.post("/register", validate(request.register), authController.register);
router.post("/login", validate(request.login), authController.login);
router.post(
  "/authenticate",
  validate(request.authenticate),
  authController.authenticate
);
router.post("/verify", validate(request.verify), authController.verify);

export default router;
