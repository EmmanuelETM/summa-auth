import { z } from "zod";

const request = {}

request.register = z.object({
    name: z.string().min(1).max(),
    alias: z.string().min(1),
    url: z.string().url().min(5),
    icon: z.string().url().min(1)
}).strict();

export default request