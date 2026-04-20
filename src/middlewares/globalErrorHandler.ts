import type { Response, Request, NextFunction } from "express";

export const globalErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error("Global Error Handler:", err);
  
  res.status(500).send({ success: false, message: (err as Error).message });
};
