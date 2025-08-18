import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config.js";
import { v4 as uuidv4 } from "uuid";

export class AuthController {
  constructor({ UserModel }) {
    this.userModel = UserModel;
  }
  portal = (_, res) => {
    return res.status(200).json({
      status: "ok",
      portal: config.PORTAL,
    });
  };

  register = async (req, res) => {
    const { username, password, email } = req.body;

    try {
      const user = await this.userModel.getOne({ username, email });

      if (user) {
        return res.status(409).json({
          status: "error",
          message: "Username or email already exists",
        });
      }

      const id = uuidv4();
      const hashedPassword = await bcrypt.hash(password, 10);

      // create the user
      await this.userModel.create({
        id,
        username,
        password: hashedPassword,
        email,
      });

      return res.status(201).json({
        status: "ok",
        message: "User registered successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        ...(config.MODE === "development" && { error }),
      });
    }
  };

  login = async (req, res) => {
    const { username, password, app } = req.body;

    try {
      const user = await this.userModel.getOne({ username });

      if (!user) {
        return res.status(400).json({
          status: "error",
          message: "The username or password is incorrect",
        });
      }

      if (!user.enabled) {
        return res.status(403).json({
          status: "error",
          message: "User account is disabled",
        });
      }

      const pass = await bcrypt.compare(password, user.password);
      if (!pass) {
        return res.status(400).json({
          status: "error",
          message: "The username or password is incorrect",
        });
      }

      const token = jwt.sign(
        { username: user.username, app },
        config.SECRET_KEY
      );

      return res.status(200).json({
        status: "ok",
        username: user.username.toLowerCase(),
        token,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        ...(config.MODE === "development" && { error }),
      });
    }
  };

  authenticate = async (req, res) => {
    try {
      const token = jwt.verify(req.body.token, config.SECRET_KEY);

      const user = await this.userModel.getOne({ username: token.username });

      if (!user.enabled) {
        return res.status(403).json({
          status: "error",
          message: "User account is disabled",
        });
      }

      return res.status(200).json({
        status: "ok",
        message: "Token authenticated",
      });
    } catch (error) {
      return res.status(401).json({
        status: "error",
        message: "Invalid token",
        ...(config.MODE === "development" && { error }),
      });
    }
  };

  verify = async (req, res) => {
    try {
      const token = jwt.verify(req.body.token, config.SECRET_KEY);

      return res.status(200).json({
        status: "ok",
        message: "Valid token",
        token,
      });
    } catch (error) {
      return res.status(401).json({
        status: "error",
        message: "Invalid token",
        ...(config.MODE === "development" && { error }),
      });
    }
  };
}
