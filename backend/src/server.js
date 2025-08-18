import express from "express";
import config from "../config.js";
import { corsMiddleware } from "./middlewares/corsMiddleware.js";
import { validateToken } from "./middlewares/validateToken.js";
import morgan from "morgan";

import { createAppRouter } from "./routers/appRouter.js";
import { createAuthRouter } from "./routers/authRouter.js";
import { createUsersRouter } from "./routers/userRouter.js";

export const createServer = ({ AppModel, UsersModel, KeysModel }) => {
  const server = express();
  const appRouter = createAppRouter({ AppModel });
  const usersRouter = createUsersRouter({ UsersModel });
  const authRouter = createAuthRouter({ UsersModel });

  server.disable("x-powered-by");
  server.use(express.json());
  server.use(morgan("dev"));

  server.use(corsMiddleware());

  server.use(validateToken({ KeysModel }));
  server.use("/api/auth", authRouter);
  server.use("/api/apps", appRouter);
  server.use("/api/users", usersRouter);

  server.listen(config.PORT || 4000, () => {
    console.log(`Example app listening on port ${config.PORT || 4000}`);
  });
};
