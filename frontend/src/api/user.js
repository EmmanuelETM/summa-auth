import api from "./index.js";

const user = {
  getAll: async () => {
    const [error, data] = await api.get("/users");

    if (error) {
      return [error, null];
    }
    return [null, data];
  },
};

export default user;
