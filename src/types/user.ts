import type { TCreateUser, TUserRole } from "@/schemas/user.js";

export type TUser = Omit<TCreateUser, "password"> & {
  uid: string;
  password?: string;
  role: TUserRole;
  createdAt: Date;
  updatedAt: Date;
};

export type TSessionUser = Pick<TUser, "uid" | "email" | "role">;
