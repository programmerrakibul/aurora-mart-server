import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "ES2023",
  dts: {
    sourcemap: true,
  },
  clean: true,
  unbundle: true,
  // CRITICAL: Prevent Prisma binaries from being bundled
  deps: {
    neverBundle: ["@prisma/client"],
  },
  // Runs the server after a successful build in watch mode
  onSuccess: "node dist/index.mjs",
});
