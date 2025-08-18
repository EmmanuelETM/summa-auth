import api from "./index.js";

const app = {
  info: async (app) => {
    const [error, data] = await api.get(`/apps/${app}`);
    return data;
  },

  getAll: async () => {
    const [error, data] = await api.get("/apps");
    return data;
  },
};

export default app;
