import pool from "@/config/db.js";
import fs from "fs";
import path from "path";

const initSqlPath = path.join(import.meta.dirname, "schema", "init.sql");

export const setupDatabase = async (): Promise<void> => {
  try {
    const sql = fs.readFileSync(initSqlPath, "utf8");

    await pool.query(sql);

    console.log(
      "✅ Database schema initialized successfully (tables created if not exist)",
    );
  } catch (error: unknown) {
    throw new Error(`Database setup failed: ${(error as Error).message}`);
  }
};
