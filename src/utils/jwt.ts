import { JWT_SECRET } from "@/config/env.js";
import type { JWTUserPayload } from "@/types/user.js";
import jwt, { type SignOptions } from "jsonwebtoken";
import { UnauthorizedError } from "./error.js";
import pool from "@/config/db.js";

export const generateToken = async (
  payload: JWTUserPayload,
  expiresIn: SignOptions["expiresIn"] = "15m",
): Promise<string> => {
  const user = {
    uid: payload.uid,
    email: payload.email,
    role: payload.role,
  };

  const token = jwt.sign(user, JWT_SECRET, {
    expiresIn,
  });

  return token;
};

export const generateRefreshToken = async (
  payload: JWTUserPayload,
): Promise<string> => {
  return await generateToken(payload, "7d");
};

export const verifyToken = async (token: string): Promise<JWTUserPayload> => {
  try {
    const { uid } = jwt.verify(token, JWT_SECRET) as JWTUserPayload;

    if (!uid) throw new UnauthorizedError();

    const result = await pool.query<JWTUserPayload>(
      `SELECT uid, email, role FROM users WHERE uid = $1;`,
      [uid],
    );

    const user = result.rows[0];

    if (!user) throw new UnauthorizedError();

    return user;
  } catch (error: unknown) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError("Token has expired!");
    }

    throw new UnauthorizedError();
  }
};
