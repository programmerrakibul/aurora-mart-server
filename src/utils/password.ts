import bcrypt from "bcryptjs";
import { ApiError } from "./error.js";

export const hashPassword = async (plainPassword: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    return hashedPassword;
  } catch (error: unknown) {
    throw new ApiError(
      "Failed to hash password!",
      "HashPasswordError",
      500,
      (error as Error).message,
    );
  }
};

export const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error: unknown) {
    throw new ApiError(
      "Failed to compare passwords!",
      "ComparePasswordsError",
      500,
      (error as Error).message,
    );
  }
};
