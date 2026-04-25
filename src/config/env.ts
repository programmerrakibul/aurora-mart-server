import { envSchema } from "@/schemas/env.js";
import { ApiError } from "@/utils/error.js";
import { config } from "dotenv";
import z from "zod";

config();

const result = envSchema.safeParse(process.env);

if (!result.success) {
  const name = "ValidationError";
  const message = "Environment Variable Validation Failed!";
  const error = z.flattenError(result.error);
  const fieldErrors = error.fieldErrors;

  throw new ApiError(message, name, 422, fieldErrors);
}

export const {
  NODE_ENV,
  PORT,
  SESSION_SECRET,
  DATABASE_URL,
  DIRECT_URL,
} = result.data;

const envConfig = result.data;
export default envConfig;
