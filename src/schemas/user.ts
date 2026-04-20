import z from "zod";

export const USER_ROLE = {
  CUSTOMER: "CUSTOMER",
  SELLER: "SELLER",
  MANAGER: "MANAGER",
} as const;

export const createUserSchema = z.object({
  name: z
    .string({
      error: (iss) => {
        return iss.input === undefined || iss.input === null
          ? "Name is required!"
          : "Invalid name value!";
      },
    })
    .trim()
    .min(1, "Name cannot be empty!")
    .max(150, "Name cannot exceed 150 characters!"),
  email: z
    .email({
      error: (iss) => {
        return iss.input === undefined || iss.input === null
          ? "Email is required!"
          : "Invalid email value!";
      },
    })
    .trim()
    .lowercase()
    .min(1, "Email cannot be empty!")
    .max(255, "Email cannot exceed 255 characters!"),
  gender: z
    .enum(["Male", "Female"], {
      error: (iss) => {
        return iss.input === undefined || iss.input === null
          ? "Gender is required!"
          : `${iss.input} is not a valid gender!`;
      },
    })
    .transform(
      (val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(),
    ),
  password: z
    .string({
      error: (iss) => {
        return iss.input === undefined || iss.input === null
          ? "Password is required!"
          : "Invalid password value!";
      },
    })
    .trim()
    .min(6, "Password must be at least 6 characters long!")
    .max(50, "Password cannot exceed 50 characters!"),
  role: z
    .enum<TUserRole[]>(Object.values(USER_ROLE), {
      error: (iss) => {
        return iss.input === undefined || iss.input === null
          ? "Role is required!"
          : `${iss.input} is not a valid role!`;
      },
    })
    .transform((val) => val.toUpperCase())
    .default(USER_ROLE.CUSTOMER),
  photoURL: z
    .url({
      error: (iss) => {
        return iss.input === undefined || iss.input === null
          ? "Photo URL is required!"
          : "Invalid photo URL value!";
      },
    })
    .default("https://example.com/default-profile.png")
    .optional(),
});

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
export type TCreateUser = z.infer<typeof createUserSchema>;
