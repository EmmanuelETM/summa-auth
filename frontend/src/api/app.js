import api from "./index.js";

const app = {
  info: async (app) => {
    const [error, data] = await api.get(`/apps/${app}`);

    if (error) {
      return [error, null];
    }
    return [null, data];
  },

  getAll: async () => {
    const [error, data] = await api.get("/apps");

    if (error) {
      return [error, null];
    }
    return [null, data];
  },
};

export default app;
