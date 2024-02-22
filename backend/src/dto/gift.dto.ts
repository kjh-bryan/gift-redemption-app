import { z } from "zod";

export const CreateGiftDTO = z.object({
  body: z.object({
    gift_name: z.string({
      required_error: "Gift name is required",
    }),
  }),
});
