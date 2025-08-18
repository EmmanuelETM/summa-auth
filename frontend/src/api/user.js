import api from "./index.js";

const user = {
  getAll: async () => {
    const [error, data] = await api.get("/users");
    return data;
  },
};

export default user;
