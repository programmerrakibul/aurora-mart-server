import z from "zod";

export const GENDER = {
  MALE: "Male",
  FEMALE: "Female",
} as const;

export type TUserGender = (typeof GENDER)[keyof typeof GENDER];

export const USER_ROLE = {
  CUSTOMER: "CUSTOMER",
  SELLER: "SELLER",
  MANAGER: "MANAGER",
} as const;

export type TUserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

const GenderEnum = z.enum<TUserGender[]>(Object.values(GENDER), {
  error: (iss) => {
    return iss.input === undefined || iss.input === null
      ? "Gender is required!"
      : `${iss.input} is not a valid gender!`;
  },
});

export const createUserSchema = z.object(
  {
    name: z
      .string({
        error: (iss) => {
          return iss.input === undefined || iss.input === null
            ? "Name is required!"
            : "Invalid name value!";
        },
      })
      .trim()
      .min(3, "Name must be at least 3 characters long!")
      .max(150, "Name cannot exceed 150 characters!"),

    email: z
      .string({
        error: (iss) => {
          return iss.input === undefined || iss.input === null
            ? "Email is required!"
            : "Invalid email value!";
        },
      })
      .trim()
      .lowercase()
      .email("Invalid email value!")
      .min(1, "Email cannot be empty!")
      .max(255, "Email cannot exceed 255 characters!"),

    gender: z.preprocess((val) => {
      if (typeof val !== "string") return val;

      return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase().trim();
    }, GenderEnum),

    password: z
      .string({
        error: (iss) => {
          return iss.input === undefined || iss.input === null
            ? "Password is required!"
            : "Invalid password value!";
        },
      })
      .min(6, "Password must be at least 6 characters long!")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter!")
      .regex(/[a-z]/, "Must contain at least one lowercase letter!")
      .regex(/[0-9]/, "Must contain at least one number!")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character!")
      .max(50, "Password cannot exceed 50 characters!"),

    photoURL: z
      .url({
        error: (iss) => {
          return iss.input === undefined || iss.input === null
            ? "Photo URL is required!"
            : "Invalid photo URL value!";
        },
      })
      .trim()
      .lowercase()
      .default("https://example.com/default-profile.png")
      .optional(),
  },
  {
    error: (iss) => {
      return typeof iss.input !== "object"
        ? "User data is required!"
        : "Invalid user data!";
    },
  },
);

export const loginUserSchema = createUserSchema.pick({
  email: true,
  password: true,
});

export type TLoginUser = z.infer<typeof loginUserSchema>;
export type TCreateUser = z.infer<typeof createUserSchema>;
