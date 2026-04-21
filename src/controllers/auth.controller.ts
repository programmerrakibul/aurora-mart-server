import pool from "@/config/db.js";
import { hashPassword } from "@/utils/password.js";
import { USER_ROLE, type TCreateUser } from "@/schemas/user.js";
import type { TSuccessResponse } from "@/types/index.js";
import type { TUser } from "@/types/user.js";
import type { Request, Response } from "express";

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

export const postUser = async (
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

  res.send({
    success: true,
    message: "User created successfully!",
    data: rows[0]!,
  });
};
