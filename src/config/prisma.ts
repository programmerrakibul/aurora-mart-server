import { PrismaClient } from "@/generated/prisma/client.js";
import { PrismaNeon } from "@prisma/adapter-neon";
import envConfig, { DATABASE_URL } from "./env.js";
import { NODE_ENV } from "@/schemas/env.js";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const adapter = new PrismaNeon({ connectionString: DATABASE_URL });
const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter, errorFormat: "pretty" });

if (envConfig.NODE_ENV !== NODE_ENV.PRODUCTION) {
  globalForPrisma.prisma = prisma;
}

export default prisma;
