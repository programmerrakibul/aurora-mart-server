import { ValidationError } from "@/utils/error.js";
import type { Request, Response, NextFunction } from "express";
import { z, type ZodObject } from "zod";

export const validate = (schema: ZodObject) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const error = z.flattenError(result.error);
      const formErrors = error.formErrors;
      const fieldErrors = error.fieldErrors;
      const details = formErrors.length > 0 ? formErrors : fieldErrors;

      throw new ValidationError("Validation Failed!", details);
    }

    req.body = result.data;
    next();
  };
};
