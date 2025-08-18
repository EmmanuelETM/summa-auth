import { Router } from "express";
import { AppController } from "../controllers/app.js";
import validate from "../middlewares/validateRequest.js";
import request from "./schemas/app.js";

const router = Router();
const appController = new AppController();

router.post("/", validate(request.register), appController.create);
router.get("/:id", appController.getOne);

export default router;
