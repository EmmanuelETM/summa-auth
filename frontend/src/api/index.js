import config from "../config.js";

const API = {
  config: {
    url: config.API_URL,
    key: config.API_KEY,
    app: "",
  },

  setConfig(params) {
    this.config = { ...this.config, ...params };
  },

  async fetch(endpoint, method = "GET", body = null) {
    let error, data;

    try {
      const response = await fetch(this.config.url + endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(this.config.key && {
            Authorization: `Bearer ${this.config.key}`,
          }),
        },
        body: body ? JSON.stringify(body) : null,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unknown error occurred");
      }

      data = result;
    } catch (e) {
      error = e.message;
    }

    return [error, data];
  },

  get(endpoint) {
    return this.fetch(endpoint);
  },

  post(endpoint, body) {
    return this.fetch(endpoint, "POST", body);
  },

  patch(endpoint, body) {
    return this.fetch(endpoint, "PATCH", body);
  },
};

export default API;
