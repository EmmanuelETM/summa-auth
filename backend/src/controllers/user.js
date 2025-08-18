import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config.js";
import { v4 as uuidv4 } from "uuid";

export class UsersController {
  constructor({ UsersModel }) {
    this.usersModel = UsersModel;
  }

  getAll = async (_, res) => {
    try {
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  };

  update = async (req, res) => {
    try {
      const currentusername = req.params.username;
      let updateduser = req.body;

      if (updateduser?.username) {
        const username = updateduser.username.toLowerCase();
        updateduser = { ...updateduser, username };
      }

      await this.usersModel.update({
        username: currentusername,
        data: updateduser,
      });

      let token = undefined;
      if (updateduser?.username)
        token = jwt.sign({ username: updateduser.username }, config.SECRET_KEY);

      return res.status(200).json({
        status: "ok",
        message: "Profile updated successfully.",
        token,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  };

  updatePassword = async (req, res) => {
    const currentusername = req.params.username;

    const exists = await this.usersModel.getOne({
      username: currentusername,
      email: "",
    });

    if (!exists) {
      return res.status(400).json({ message: "User not found" });
    }

    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await this.usersModel.update({
      username: currentusername,
      data: { password: hashedPassword },
    });

    return res.status(200).json({
      status: "ok",
      message: "Password updated successfully.",
    });
  };

  // Recrear el id y el password. --Eliminar despues de importados
  import = async (_, res) => {
    const users = await this.usersModel.getAll();
    const usersForImport = users.filter((user) => user.id == "");

    for (const user of usersForImport) {
      const id = uuidv4();
      const password = await bcrypt.hash("1234", 10);
      await this.usersModel.update({
        username: user.username,
        data: { id, password },
      });
    }

    return res.status(200).json({
      usersImpored: usersForImport,
    });
  };
}
