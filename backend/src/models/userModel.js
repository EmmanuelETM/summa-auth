import db from "../db/mysql.js";

export class UserModel {
  // Crea un nuevo usuario
  static async create({ id, username, password, email }) {
    await db.pool.query(
      `INSERT INTO users (id, username, password, email, enabled) VALUES (?, ?, ?, ?, 1)`,
      [id, username, password, email]
    );
    return await this.getOne({ username });
  }

  // Busca usuario por nombre
  static async getOne({ username, email }) {
    const [result] = await db.pool.query(
      `SELECT * FROM users WHERE username = ? OR email = ?`,
      [username, email]
    );
    const user = result;
    return user || null;
  }

  // Todos los usuarios
  static async getAll() {
    const results = await db.pool.query(
      `SELECT id, username, email, enabled FROM users`
    );
    const users = results;
    return users || null;
  }

  // Actualizar
  static async update({ username, data }) {
    const result = await db.pool.query(
      "UPDATE users SET ? WHERE username = ?",
      [data, username]
    );
    return true;
  }
}
