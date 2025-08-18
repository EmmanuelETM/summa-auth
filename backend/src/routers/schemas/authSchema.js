import { z } from "zod";

export const authSchema = {
  register: z
    .object({
      username: z.string().min(1).max(),
      password: z.string().min(1),
      email: z.string().email().min(5),
    })
    .strict(),

  login: z
    .object({
      username: z.string().min(1),
      password: z.string().min(1),
      app: z.string().min(1),
    })
    .strict(),

  authenticate: z
    .object({
      token: z.string().min(1),
    })
    .strict(),

  verify: z
    .object({
      token: z.string().min(1),
    })
    .strict(),
};
