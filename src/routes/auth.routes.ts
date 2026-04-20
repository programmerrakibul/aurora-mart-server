import { findAllUsers } from "@/controllers/auth.controller.js";
import { Router } from "express";

const authRoutes = Router();

authRoutes.get("/", findAllUsers);

export default authRoutes;
