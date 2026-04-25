import { comparePasswords, hashPassword } from "@/utils/password.js";
import {
  USER_ROLE,
  type TCreateUser,
  type TLoginUser,
  type TUserRole,
} from "@/schemas/user.js";
import type { TSuccessResponse } from "@/types/index.js";
import type { TSessionUser, TUser } from "@/types/user.js";
import type { Request, Response } from "express";
import { ConflictError, UnauthorizedError } from "@/utils/error.js";
import prisma from "@/config/prisma";

export const findAllUsers = async (
  _req: Request,
  res: Response<TSuccessResponse<TUser[]>>,
) => {
  const result = (await prisma.users.findMany({
    select: {
      uid: true,
      name: true,
      email: true,
      password: false,
      gender: true,
      role: true,
      photoURL: true,
      createdAt: true,
      updatedAt: true,
    },
    take: 10,
    orderBy: { createdAt: "desc" },
  })) as TUser[];

  res.send({
    success: true,
    message: "All users fetched successfully!",
    total: result.length,
    data: result,
  });
};

export const getUserProfile = async (
  req: Request,
  res: Response<TSuccessResponse<TUser>>,
) => {
  const { uid, email } = req.session.user as TSessionUser;

  const result = await prisma.users.findFirst({
    where: { uid, email },
  });

  if (!result) throw new UnauthorizedError("User not found!");

  const { password, ...user } = result;

  res.send({
    success: true,
    message: "User profile fetched successfully!",
    data: user as TUser,
  });
};

export const registerUser = async (
  req: Request<{}, {}, TCreateUser>,
  res: Response<TSuccessResponse<Pick<TUser, "uid">>>,
) => {
  const { name, email, password, gender, photoURL } = req.body;
  const user = await prisma.users.findFirst({
    where: {
      email,
    },
  });

  if (user) throw new ConflictError("Email already in use!");

  const hashedPassword = await hashPassword(password);

  const { uid } = await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
      gender,
      role: USER_ROLE.CUSTOMER,
      photoURL,
    },
  });

  res.status(201).send({
    success: true,
    message: "User created successfully!",
    data: { uid },
  });
};

export const loginUser = async (
  req: Request<{}, {}, TLoginUser>,
  res: Response<TSuccessResponse>,
) => {
  const { email, password } = req.body;

  const user = await prisma.users.findFirst({
    where: {
      email,
    },
  });

  if (!user) throw new UnauthorizedError("Invalid credentials!");

  const isValidPassword = await comparePasswords(password, user.password);

  if (!isValidPassword) throw new UnauthorizedError("Invalid credentials!");

  req.session.user = {
    uid: user.uid,
    email: user.email,
    role: user.role as TUserRole,
  };

  res.send({
    success: true,
    message: "Login successful!",
  });
};

export const logoutUser = async (req: Request, res: Response) => {
  req.session.destroy((err: unknown) => {
    if (err) throw err;

    res.send({
      success: true,
      message: "Logout successful!",
    });
  });
};
