import db from "../db/mysql.js";

export class AppModel {
  static async create({ id, name, alias, url, icon }) {
    await db.pool.query(
      `INSERT INTO apps (id, name, alias, url, icon) VALUES (?, ?, ?, ?, ?)`,
      [id, name, alias, url, icon]
    );
    return await app.getOne(id);
  }

  static async getOne({ id }) {
    const [result] = await db.pool.query(
      `SELECT * FROM apps WHERE id = ? OR alias = ?`,
      [id, id]
    );

    return result;
  }
}
