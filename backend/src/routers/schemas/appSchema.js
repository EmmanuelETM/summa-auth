import { z } from "zod";

export const appSchema = {
  register: z
    .object({
      name: z.string().min(1).max(),
      alias: z.string().min(1),
      url: z.string().url().min(5),
      icon: z.string().url().min(1),
    })
    .strict(),
};
