import { type } from "os";
import * as z from "zod";

export const ServerFormSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required",
  }),
});

export type ServerFormValidator=z.infer<typeof ServerFormSchema>

