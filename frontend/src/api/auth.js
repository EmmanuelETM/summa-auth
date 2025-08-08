import api from "./index.js";

const auth = {
  user: {},

  config(params) {
    api.setConfig(params); // Use the new method from api.js
  },

  async login(username, password) {
    const [error, data] = await api.post("/auth/login", { username, password });
    return [error, data];
  },

  async portal() {
    const [error, data] = await api.get("/auth/portal");

    return `${data.portal}/?app=${api.config.app}`;
  },

  async verify(token) {
    const [error, data] = await api.post("/auth/verify", { token });

    this.user = data.token;
    return [error, true];
  },
};

export default auth;
