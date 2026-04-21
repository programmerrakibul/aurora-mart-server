import { ApiError } from "@/utils/error.js";

import type { TErrorResponse } from "@/types/index.js";
import type { Response, Request, NextFunction } from "express";

export const globalErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response<TErrorResponse>,
  _next: NextFunction,
) => {
  let statusCode = 500;
  let message = "An unexpected error occurred!";
  let details: unknown = undefined;

  console.error(err);

  if (err instanceof ApiError) {
    message = err.message;
    statusCode = err.statusCode;
    details = err.details;
  }

  res.status(statusCode).send({
    success: false,
    message,
    details,
  });
};
