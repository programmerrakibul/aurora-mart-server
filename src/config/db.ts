import { Pool } from "pg";
import envConfig from "./env.js";

export const pool = new Pool({
  user: envConfig.DB_USER,
  password: envConfig.DB_PASSWORD,
  host: envConfig.DB_HOST,
  port: envConfig.DB_PORT,
  database: envConfig.DB_NAME,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

pool.on("connect", () => {
  console.log("PostgreSQL connected!");
});

export default pool;
