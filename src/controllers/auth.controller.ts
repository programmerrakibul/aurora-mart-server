import pool from "@/config/db.js";
import userQueries from "@/database/queries/user/index.js";
import { catchAsync } from "@/middlewares/catchAsync.js";

export const findAllUsers = catchAsync(async (_req, res) => {
  const { rows, rowCount } = await pool.query(userQueries.findAll);

  const data = rows.filter((user) => delete user.password);

  res.send({
    success: true,
    message: "All users fetched successfully!",
    total: rowCount || 0,
    data,
  });
});
