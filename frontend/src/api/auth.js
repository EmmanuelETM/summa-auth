import api from "./index.js";

const auth = {
  user: {},

  config(params) {
    api.setConfig(params); // Use the new method from api.js
  },

  async login({ username, password, app }) {
    const [error, data] = await api.post("/auth/login", {
      username,
      password,
      app,
    });

    return [error, data];
  },

  async register({ username, email, password }) {
    const [error, data] = await api.post("/auth/register", {
      username,
      email,
      password,
    });
    return [error, data];
  },

  async portal() {
    const [error, data] = await api.get("/auth/portal");

    return `${data.portal}/?app=${api.config.app}`;
  },

  async verify(token) {
    const [error, data] = await api.post("/auth/verify", { token });

    this.token = data.token;
    return [error, data];
  },
};

export default auth;
