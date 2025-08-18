import { Router } from "express";
import { AppController } from "../controllers/appController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { appSchema } from "./schemas/appSchema.js";

export const createAppRouter = ({ AppModel }) => {
  const router = Router();
  const appController = new AppController({ AppModel });

  router.post(
    "/",
    validateRequest({ schema: appSchema.register }),
    appController.create
  );

  router.get("/", appController.getAll);
  router.get("/:id", appController.getOne);

  return router;
};
