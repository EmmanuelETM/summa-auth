import { AppModel } from "./models/appModel.js";
import { UserModel } from "./models/userModel.js";
import { KeysModel } from "./models/keysModel.js";
import { createApp } from "./app.js";

createApp({ AppModel, UserModel, KeysModel });
