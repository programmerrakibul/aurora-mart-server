import pool from "@/config/db.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initSqlPath = path.join(__dirname, "schema", "init.sql");

export const setupDatabase = async (): Promise<void> => {
  try {
    console.log(initSqlPath);
    const sql = fs.readFileSync(initSqlPath, "utf8");

    await pool.query(sql);

    console.log(
      "✅ Database schema initialized successfully (tables created if not exist)",
    );
  } catch (error: unknown) {
    throw new Error(`Database setup failed: ${(error as Error).message}`);
  }
};
