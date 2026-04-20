import type { TSuccessResponse } from "@/types/index.js";
import type { Request, Response, NextFunction, RequestHandler } from "express";

type AsyncRequestHandler = (
  req: Request,
  res: Response<TSuccessResponse>,
  next: NextFunction,
) => Promise<any>;

export const catchAsync = (fn: AsyncRequestHandler): RequestHandler => {
  return (
    req: Request,
    res: Response<TSuccessResponse>,
    next: NextFunction,
  ) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
