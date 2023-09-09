import { ChannelType } from "@prisma/client";
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

export type ServerFormValidator = z.infer<typeof ServerFormSchema>;

export const ChannelFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Channel name is required",
    })
    .refine((name) => name !== "general", {
      message: "Channel name cannot be 'general'",
    }),
  type: z.nativeEnum(ChannelType),
});

export type ChannelFormValidator = z.infer<typeof ChannelFormSchema>;
