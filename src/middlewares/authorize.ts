import type { TUserRole } from "@/schemas/user.js";
import { ForbiddenError } from "@/utils/error.js";
import type { Request, Response, NextFunction } from "express";

export const authorize = (allowedRoles: TUserRole[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const user = req.session.user;

      if (!user) throw new ForbiddenError("You are not logged in!");

      allowedRoles = allowedRoles.map((r) => r.toUpperCase() as TUserRole);

      if (!allowedRoles.includes(user.role)) {
        throw new ForbiddenError(
          "You don't have permission to access this resource!",
        );
      }

      next();
    } catch (error: unknown) {
      throw error;
    }
  };
};
