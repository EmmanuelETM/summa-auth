import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config.js";
import { UsersModel } from "../models/userModel.js";
import { v4 as uuidv4 } from "uuid";

export class AuthController {
  portal = (_, res) => {
    return res.status(200).json({
      status: "ok",
      portal: config.PORTAL,
    });
  };

  register = async (req, res) => {
    const { username, password, email } = req.body;

    try {
      // Buscar el usuario
      const user = await UsersModel.getOne({ username, email });

      // Confirmar que no exista
      if (user) {
        return res.status(409).json({
          status: "error",
          message: "Username or email already exists",
        });
      }

      // Generar ID
      const id = uuidv4();

      // Preparar la clave hasheada
      const hashedPassword = await bcrypt.hash(password, 10);

      // Guardar el usuario
      await UsersModel.create({
        id,
        username,
        password: hashedPassword,
        email,
      });

      // Enviar la respuesta
      return res.status(201).json({
        status: "ok",
        message: "User registered successfully",
      });
    } catch (error) {
      //En caso de error
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
      // Buscar el usuario
      const user = await UsersModel.getOne({ username });

      // Saber si existe el usuario
      if (!user) {
        return res.status(400).json({
          status: "error",
          message: "The username or password is incorrect",
        });
      }

      // Si esta deshabilitado
      if (!user.enabled) {
        return res.status(400).json({
          status: "error",
          message: "User account is disabled",
        });
      }

      // validar la contraseña
      const pass = await bcrypt.compare(password, user.password);
      if (!pass) {
        return res.status(400).json({
          status: "error",
          message: "The username or password is incorrect",
        });
      }

      // Firmar un nuevo token
      const token = jwt.sign(
        { username: user.username, app },
        config.SECRET_KEY
      );

      // Enviar la respuesta
      return res.status(200).json({
        status: "ok",
        username: user.username.toLowerCase(),
        token,
      });
    } catch (error) {
      //En caso de error
      return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
        ...(config.MODE === "development" && { error }),
      });
    }
  };

  authenticate = async (req, res) => {
    try {
      // Vefificar si el token es valido
      const token = jwt.verify(req.body.token, config.SECRET_KEY);

      // Extraer el username del token
      const username = token.username;

      // Buscar el usuario
      const user = await UsersModel.getOne({ username });

      // Validar si esta activo
      if (!user.enabled) {
        return res.status(403).json({
          status: "error",
          message: "User account is disabled",
        });
      }

      // Enviar la respuesta
      return res.status(200).json({
        status: "ok",
        message: "Token authenticated",
      });
    } catch (error) {
      //En caso de error
      return res.status(401).json({
        status: "error",
        message: "Invalid token",
        ...(config.MODE === "development" && { error }),
      });
    }
  };

  verify = async (req, res) => {
    try {
      // Vefificar si el token es valido
      const token = jwt.verify(req.body.token, config.SECRET_KEY);

      // Enviar la respuesta
      return res.status(200).json({
        status: "ok",
        message: "Valid token",
        token,
      });
    } catch (error) {
      //En caso de error
      return res.status(401).json({
        status: "error",
        message: "Invalid token",
        ...(config.MODE === "development" && { error }),
      });
    }
  };
}
