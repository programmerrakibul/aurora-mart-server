import pool from "@/config/db.js";
import { comparePasswords, hashPassword } from "@/utils/password.js";
import {
  USER_ROLE,
  type TCreateUser,
  type TLoginUser,
} from "@/schemas/user.js";
import type { TSuccessResponse } from "@/types/index.js";
import type { TUser } from "@/types/user.js";
import type { Request, Response } from "express";
import { UnauthorizedError } from "@/utils/error.js";

export const findAllUsers = async (
  _req: Request,
  res: Response<TSuccessResponse<TUser[]>>,
) => {
  const { rows, rowCount } = await pool.query<TUser>(
    `SELECT uid, name, email, gender, role, photoURL, createdAt, updatedAt
      FROM users 
      ORDER BY createdAt DESC, name ASC;`,
  );

  res.send({
    success: true,
    message: "All users fetched successfully!",
    total: rowCount || 0,
    data: rows,
  });
};

export const getUserProfile = async (
  req: Request,
  res: Response<TSuccessResponse<TUser>>,
) => {
  const { uid } = req.session.user;

  const result = await pool.query<TUser>(
    `SELECT uid, name, email, gender, role, photoURL, createdAt, updatedAt
      FROM users
      WHERE uid = $1;`,
    [uid],
  );

  const user = result.rows[0];

  if (!user) throw new UnauthorizedError("User not found!");

  res.send({
    success: true,
    message: "User profile fetched successfully!",
    data: user,
  });
};

export const registerUser = async (
  req: Request<{}, {}, TCreateUser>,
  res: Response<TSuccessResponse<Pick<TUser, "uid">>>,
) => {
  const { name, email, password, gender, photoURL } = req.body;
  const hashedPassword = await hashPassword(password);
  const values = [
    name,
    email,
    hashedPassword,
    gender,
    USER_ROLE.CUSTOMER,
    photoURL,
  ];

  const query = `INSERT INTO users (name, email, password, gender, role, photoURL)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING uid;`;

  const { rows } = await pool.query<Pick<TUser, "uid">>(query, values);

  res.status(201).send({
    success: true,
    message: "User created successfully!",
    data: rows[0]!,
  });
};

export const loginUser = async (
  req: Request<{}, {}, TLoginUser>,
  res: Response<TSuccessResponse>,
) => {
  const { email, password } = req.body;

  const result = await pool.query<TUser>(
    `SELECT * FROM users WHERE email = $1;`,
    [email],
  );
  const user = result.rows[0];

  if (!user) throw new UnauthorizedError("Invalid credentials!");

  const isValidPassword = await comparePasswords(password, user.password || "");

  if (!isValidPassword) throw new UnauthorizedError("Invalid credentials!");

  req.session.user = {
    uid: user.uid,
    email: user.email,
    role: user.role,
  };

  res.send({
    success: true,
    message: "Login successful!",
  });
};
