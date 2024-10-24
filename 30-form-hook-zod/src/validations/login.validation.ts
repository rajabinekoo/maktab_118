import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(5, "Username must contain at least 5 characters")
    .refine((value) => !/\d+/g.test(value), "Invalid username"),
  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .refine(
      (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g.test(value),
      "Invalid password"
    ),
});
