import type { TUserRole } from "@/schemas/user.js";
import { ForbiddenError } from "@/utils/error.js";
import type { Request, Response, NextFunction } from "express";

export const authorize = (allowedRoles: TUserRole[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const user = req.session.user;

      allowedRoles = allowedRoles.map((r) => r.toUpperCase() as TUserRole);
      const isAllowed = allowedRoles.includes(user?.role as TUserRole);

      if (!user || !isAllowed) {
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
