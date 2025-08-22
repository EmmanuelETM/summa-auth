import api from "./index.js";

const auth = {
  config(params) {
    api.setConfig(params); // Use the new method from api.js
  },

  async login({ username, password, app }) {
    const [error, data] = await api.post("/auth/login", {
      username,
      password,
      app,
    });

    if (error) {
      return [error, null];
    }

    return [null, data];
  },

  async register({ username, email, password }) {
    const [error, data] = await api.post("/auth/register", {
      username,
      email,
      password,
    });

    if (error) {
      return [error, null];
    }

    return [null, data];
  },

  async updatePassword({ username, password }) {
    const [error, data] = await api.patch(`/users/${username}/password`, {
      password,
    });

    if (error) {
      return [error, null];
    }
    return [null, data];
  },

  async portal() {
    const [error, data] = await api.get("/auth/portal");

    if (error) {
      return [error, null];
    }

    return `${data.portal}/?app=${api.config.app}`;
  },

  async verify(token) {
    const [error, data] = await api.post("/auth/verify", { token });

    if (error) {
      return [error, null];
    }

    this.token = data.token;
    return [null, data];
  },
};

export default auth;
