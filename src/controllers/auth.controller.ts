import pool from "@/config/db.js";
import userQueries from "@/database/queries/user/index.js";
import { catchAsync } from "@/middlewares/catchAsync.js";

import type { TSuccessResponse } from "@/types/index.js";
import type { TUser } from "@/types/user.js";
import type { Response } from "express";

export const findAllUsers = catchAsync(
  async (_req, res: Response<TSuccessResponse<TUser[]>>) => {
    const { rows, rowCount } = await pool.query<TUser, TUser[]>(
      userQueries.findAll,
    );

    res.send({
      success: true,
      message: "All users fetched successfully!",
      total: rowCount || 0,
      data: rows,
    });
  },
);
