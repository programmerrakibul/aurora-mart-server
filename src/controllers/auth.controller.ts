import pool from "@/config/db.js";
import { catchAsync } from "@/middlewares/catchAsync.js";

export const findAllUsers = catchAsync(async (_req, res) => {
  const { rows, rowCount } = await pool.query("SELECT * FROM users;");

  res.send({
    success: true,
    message: "All users fetched successfully!",
    total: rowCount || 0,
    data: rows,
  });
});
