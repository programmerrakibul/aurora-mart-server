import type { Request, Response, NextFunction } from "express";
import type { ZodObject } from "zod";

export const validate = (schema: ZodObject) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { success, data, error } = schema.safeParse(req.body);

    if (!success) {
      throw error;
    }

    req.body = data;
    next();
  };
};
