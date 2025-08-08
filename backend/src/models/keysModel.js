import db from "../databases/mysql.js";

const bearer = {};

bearer.getOne = async ({ key }) => {
  console.log(key);
  const [result] = await db.pool.query(
    "SELECT id FROM `keys` WHERE `token` = ?",
    [key]
  );

  return result;
};

export default bearer;
