import type { TCreateUser, TUserRole } from "@/schemas/user.js";

export type TUser = Omit<TCreateUser, "password"> & {
  uid: string;
  password?: string;
  role: TUserRole;
  created_at: Date;
  updated_at: Date;
};

export type TSessionUser = Pick<TUser, "uid" | "email" | "role">;
