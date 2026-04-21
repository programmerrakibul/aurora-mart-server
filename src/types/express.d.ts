import type { JWTUserPayload } from "./user.ts";

declare global {
  namespace Express {
    interface Request {
      user: JWTUserPayload;
    }
  }
}

export {};
