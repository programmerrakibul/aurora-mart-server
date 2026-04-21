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

  if (err instanceof Error) {
    message = err.message;
  }

  res
    .status(statusCode)
    .send({
      success: false,
      message,
      details: (err as { details?: unknown }).details,
    });
};
