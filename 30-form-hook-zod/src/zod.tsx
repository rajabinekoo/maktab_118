import React from "react";
import { z, ZodError } from "zod";

// const mySchema = z.string();
const User = z.object({
  username: z
    .string()
    .min(5, "Username must contain at least 5 characters")
    .refine((value) => !/\d+/g.test(value), "Invalid username"),
});

export const ZodTesting: React.FC = () => {
  React.useEffect(() => {
    try {
      User.parse({ username: "alirajabi" });
      console.log("valid");
    } catch (error) {
      const err = error as ZodError;
      for (const errorItem of err.errors) {
        console.log(errorItem.message);
      }
    }
  }, []);

  return <p>Zod testing</p>;
};
