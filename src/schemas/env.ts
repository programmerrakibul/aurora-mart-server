import z from "zod";

export const NODE_ENV = {
  TEST: "test",
  PRODUCTION: "production",
  DEVELOPMENT: "development",
} as const;

export const envSchema = z.object({
  NODE_ENV: z
    .enum<TNodeEnv[]>(Object.values(NODE_ENV), "Invalid NODE_ENV value!")
    .transform((val) => val.toLowerCase() as TNodeEnv),

  PORT: z.coerce
    .number("Invalid PORT value!")
    .positive("PORT value must be a positive number!")
    .optional()
    .default(8000),

  DATABASE_URL: z
    .string("Invalid DATABASE_URL value!")
    .startsWith("postgresql://", "Invalid POSTGRESQL DATABASE_URL value!")
    .includes("-pooler", "DATABASE_URL must be a pooling connection!")
    .includes("sslmode=require", "DATABASE_URL must contain -sslmode require!")
    .includes(".neon.tech", "DATABASE must be a Neon database!"),

  SESSION_SECRET: z
    .string("Invalid SESSION_SECRET value!")
    .trim()
    .min(1, "SESSION_SECRET cannot be empty!")
    .min(32, "SESSION_SECRET must be at least 32 characters long!")
    .max(64, "SESSION_SECRET cannot exceed 64 characters!"),
});

export type TNodeEnv = (typeof NODE_ENV)[keyof typeof NODE_ENV];
export type TEnv = z.infer<typeof envSchema>;
