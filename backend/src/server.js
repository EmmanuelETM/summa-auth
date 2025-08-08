import express from "express";
import config from "../config.js";
import { corsMiddleware } from "./middlewares/corsMiddleware.js";
import authenticated from "./middlewares/validateToken.js";
import morgan from "morgan";

// routes
import auth from "./routes/auth.js";
import apps from "./routes/app.js";
import users from "./routes/user.js";

const server = {};

server.run = () => {
  const app = express();
  app.disable("x-powered-by");
  app.use(express.json());
  app.use(morgan("dev"));

  app.use(corsMiddleware());

  app.use((req, res, next) => {
    console.log(req.url);
    next();
  });

  app.use(authenticated());
  app.use("/api/auth", auth);
  app.use("/api/apps", apps);
  app.use("/api/users", users);

  app.listen(config.PORT || 4000, () => {
    console.log(`Example app listening on port ${config.PORT || 4000}`);
  });
};

export default server;
