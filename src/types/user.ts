import type { TCreateUser } from "@/schemas/user.js";

export type TUser = Omit<TCreateUser, "password"> & {
  uid: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;
};
