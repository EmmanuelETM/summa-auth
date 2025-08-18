import { AppModel } from "./models/appModel.js";
import { UsersModel } from "./models/userModel.js";
import { KeysModel } from "./models/keysModel.js";
import { createServer } from "./server.js";

createServer({ AppModel, UsersModel, KeysModel });
