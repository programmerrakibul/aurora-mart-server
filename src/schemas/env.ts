import z from "zod";

export const NODE_ENV = {
  TEST: "test",
  PRODUCTION: "production",
  DEVELOPMENT: "development",
} as const;

export const envSchema = z.object({
  NODE_ENV: z
    .enum<TNodeEnv[]>(Object.values(NODE_ENV), "Invalid NODE_ENV value!")
    .default(NODE_ENV.DEVELOPMENT),
  PGUSER: z.string("Invalid PGUSER value!").min(1, "PGUSER cannot be empty!"),
  PGPASSWORD: z
    .string("Invalid PGPASSWORD value!")
    .min(1, "PGPASSWORD cannot be empty!"),
  PGHOST: z.string("Invalid PGHOST value!").default("localhost"),
  PGPORT: z.number("Invalid PGPORT value!").default(5432),
  PGDATABASE: z.string("Invalid PGDATABASE value!"),
});

export type TNodeEnv = (typeof NODE_ENV)[keyof typeof NODE_ENV];
export type TEnv = z.infer<typeof envSchema>;
