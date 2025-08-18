import express from "express";
import config from "../config.js";
import { corsMiddleware } from "./middlewares/corsMiddleware.js";
import { validateToken } from "./middlewares/validateToken.js";
import morgan from "morgan";

import { createAppRouter } from "./routers/appRouter.js";
import { createAuthRouter } from "./routers/authRouter.js";
import { createUserRouter } from "./routers/userRouter.js";

export const createApp = ({ AppModel, UserModel, KeysModel }) => {
  const app = express();
  const appRouter = createAppRouter({ AppModel });
  const userRouter = createUserRouter({ UserModel });
  const authRouter = createAuthRouter({ UserModel });

  app.disable("x-powered-by");
  app.use(express.json());
  app.use(morgan("dev"));

  app.use(corsMiddleware());

  app.use(validateToken({ KeysModel }));
  app.use("/api/auth", authRouter);
  app.use("/api/apps", appRouter);
  app.use("/api/users", userRouter);

  app.listen(config.PORT || 4000, () => {
    console.log(`Example app listening on port ${config.PORT || 4000}`);
  });
};
