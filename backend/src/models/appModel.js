import db from "../databases/mysql.js";

const app = {};

app.create = async ({ id, name, alias, url, icon }) => {
  await db.pool.query(
    `INSERT INTO apps (id, name, alias, url, icon) VALUES (?, ?, ?, ?, ?)`,
    [id, name, alias, url, icon]
  );
  return await app.getOne(id);
};

app.getOne = async ({ id }) => {
  const [result] = await db.pool.query(
    `SELECT * FROM apps WHERE id = ? OR alias = ?`,
    [id, id]
  );

  return result;
};

export default app;
