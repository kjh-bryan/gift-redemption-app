import { z } from "zod";

export const VerifyRedemptionDTO = z.object({
  query: z.object({
    gift_name: z.string({
      required_error: "Gift name is required",
    }),
    team_name: z.string({
      required_error: "Team name is required",
    }),
  }),
});

export const RedemptionDTO = z.object({
  body: z.object({
    gift_name: z.string({
      required_error: "Gift name is required",
    }),
    team_name: z.string({
      required_error: "Team name is required",
    }),
  }),
});
