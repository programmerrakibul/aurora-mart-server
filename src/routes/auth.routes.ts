import { findAllUsers, postUser } from "@/controllers/auth.controller.js";
import { validate } from "@/middlewares/validateData.js";
import { createUserSchema } from "@/schemas/user.js";
import { Router } from "express";

const authRoutes = Router();

authRoutes.get("/", findAllUsers);

authRoutes.post("/", validate(createUserSchema), postUser);

export default authRoutes;
