import appModel from "../models/appModel.js";
import { v4 as uuidv4 } from "uuid";

const app = {};

app.create = async (req, res) => {
  const { name, alias, url, icon } = req.body;

  try {
    // Buscar el app
    const app = await appModel.getOne(alias);

    // Confirmar que no exista
    if (app) {
      return res.status(409).json({
        status: "error",
        message: "App already exists",
      });
    }

    // Generar ID
    const id = uuidv4();

    // Guardar el app
    await appModel.create({ id, name, alias, url, icon });

    // Enviar la respuesta
    return res.status(201).json({
      status: "ok",
      message: "App registered successfully",
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

app.getOne = async (req, res) => {
  const { id } = req.params;
  const app = await appModel.getOne({ id });

  if (!app) {
    return res.status(404).json({
      state: "error",
      message: "App not found",
    });
  }

  res.status(200).json(app);
};

export default app;
