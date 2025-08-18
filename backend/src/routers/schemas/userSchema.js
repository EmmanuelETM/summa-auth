import { z } from "zod";

export const userSchema = {
  update: z
    .object({
      username: z.string().optional(),
      email: z.string().email().optional(),
    })
    .strict(),

  updatePassword: z
    .object({
      password: z.string().min(1),
    })
    .strict(),
};
