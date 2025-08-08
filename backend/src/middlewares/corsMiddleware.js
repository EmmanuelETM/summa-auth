import cors from "cors";

const ALLOWED_ORIGINS = ["http://localhost:4000", "http://localhost:5173"];

export const corsMiddleware = ({ options = ALLOWED_ORIGINS } = {}) =>
  cors({
    methods: "GET, POST, PATCH, DELETE, OPTIONS, HEAADER",
    origin: (origin, callback) => {
      if (options.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) return callback(null, true);

      return callback(new Error("Not allowed by CORS"));
    },
  });
