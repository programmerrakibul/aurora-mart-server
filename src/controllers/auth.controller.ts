import pool from "@/config/db.js";
import { catchAsync } from "@/middlewares/catchAsync.js";
import type { TCreateUser } from "@/schemas/user.js";

import type { TSuccessResponse } from "@/types/index.js";
import type { TUser } from "@/types/user.js";
import type { Request, Response } from "express";

export const findAllUsers = catchAsync(
  async (_req, res: Response<TSuccessResponse<TUser[]>>) => {
    const { rows, rowCount } = await pool.query<TUser, TUser[]>(
      `
SELECT uid, name, email, gender, role, photoURL, createdAt, updatedAt
FROM users 
ORDER BY createdAt DESC, name ASC;
`,
    );

    res.send({
      success: true,
      message: "All users fetched successfully!",
      total: rowCount || 0,
      data: rows,
    });
  },
);

export const postUser = catchAsync(
  async (req: Request<{}, {}, TCreateUser>, res) => {
    console.log(req.body);

    res.send({
      success: true,
      message: "User created successfully!",
    });
  },
);
