import {
  findAllUsers,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "@/controllers/auth.controller.js";
import { authorize } from "@/middlewares/authorize.js";
import { validate } from "@/middlewares/validateData.js";
import {
  createUserSchema,
  loginUserSchema,
  USER_ROLE,
} from "@/schemas/user.js";
import { Router } from "express";

const authRoutes = Router();

authRoutes.get("/all-users", authorize([USER_ROLE.MANAGER]), findAllUsers);

authRoutes.get("/profile", authorize(Object.values(USER_ROLE)), getUserProfile);

authRoutes.post("/register", validate(createUserSchema), registerUser);

authRoutes.post("/login", validate(loginUserSchema), loginUser);

authRoutes.post("/logout", logoutUser);

export default authRoutes;
