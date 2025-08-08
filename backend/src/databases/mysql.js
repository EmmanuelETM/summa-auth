import mysql from "mysql2";
import { promisify } from "util";
import config from "../../config.js";

const database = {
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  port: config.DB_PORT,
};

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    console.log(database);
    console.error("Error connecting to MySQL:", err);
    return;
  }
  if (connection) connection.release();
  console.log("Connected to MySQL");
});

pool.query = promisify(pool.query);

export default { pool };
