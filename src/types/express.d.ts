import "express-session";
import type { TSessionUser } from "./user.ts";

declare module "express-session" {
  interface SessionData {
    user: TSessionUser;
  }
}

export {};
