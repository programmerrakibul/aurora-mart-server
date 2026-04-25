import type { TCreateUser, TUserRole } from "@/schemas/user.js";

export type TUser = TCreateUser & {
  uid: string;
  role: TUserRole;
  createdAt: Date;
  updatedAt: Date;
};

export type TSessionUser = Pick<TUser, "uid" | "email" | "role">;
