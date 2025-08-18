import { Router } from "express";
import { AppController } from "../controllers/app.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { appSchema } from "./schemas/appSchema.js";

export const createAppRouter = ({ AppModel }) => {
  const router = Router();
  const appController = new AppController({ AppModel });

  router.post("/", validateRequest(appSchema.register), appController.create);
  router.get("/:id", appController.getOne);

  return router;
};
