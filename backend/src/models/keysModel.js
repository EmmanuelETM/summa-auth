import db from "../databases/mysql.js";

export class KeysModel {
  static async getOne({ key }) {
    const [result] = await db.pool.query(
      "SELECT id FROM `keys` WHERE `token` = ?",
      [key]
    );

    return result;
  }
}
