import type { Application } from "express";
import authRoutes from "./auth.routes.js";

export const mountRoutes = (app: Application) => {
  app.use("/api/v1/auth", authRoutes);
};
