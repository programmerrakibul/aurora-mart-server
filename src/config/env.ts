import { envSchema } from "@/schemas/env.js";
import { config } from "dotenv";

config();

const { success, data, error } = envSchema.safeParse(process.env);

if (!success) {
  const errorMessages = error.issues
    .map((issue) => `${issue.path.join(".")} - ${issue.message}`)
    .join("\n");
  throw new Error(`Environment variable validation failed:\n${errorMessages}`);
}

export const {
  NODE_ENV,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  PORT,
  SESSION_SECRET,
} = data;

const envConfig = data;
export default envConfig;
