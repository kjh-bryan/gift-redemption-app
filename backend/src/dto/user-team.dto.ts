import { z } from "zod";

export const UserTeamDTO = z.object({
  query: z.object({
    staff_pass_id: z.string({
      required_error: "Staff Pass ID is required",
    }),
  }),
});
