import z from "zod";

export const NODE_ENV = {
  TEST: "test",
  PRODUCTION: "production",
  DEVELOPMENT: "development",
} as const;

export const envSchema = z.object({
  NODE_ENV: z
    .enum<TNodeEnv[]>(Object.values(NODE_ENV), "Invalid NODE_ENV value!")
    .optional()
    .default(NODE_ENV.DEVELOPMENT),
  DB_USER: z.string("Invalid DB_USER value!").default("postgres"),
  DB_PASSWORD: z
    .string("Invalid DB_PASSWORD value!")
    .min(1, "DB_PASSWORD cannot be empty!"),
  DB_HOST: z.string("Invalid DB_HOST value!").default("localhost"),
  DB_PORT: z.coerce.number("Invalid DB_PORT value!").default(5432),
  DB_NAME: z.string("Invalid DB_NAME value!"),
  PORT: z.coerce
    .number("Invalid PORT value!")
    .positive("PORT value must be a positive number!")
    .optional()
    .default(8000),
});

export type TNodeEnv = (typeof NODE_ENV)[keyof typeof NODE_ENV];
export type TEnv = z.infer<typeof envSchema>;
