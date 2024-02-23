import { z } from "zod";

export const UserTeamDTO = z.object({
  query: z.object({
    staff_pass_id: z.string({
      required_error: "Staff Pass ID is required",
    }),
  }),
});

export const UpdateUserDTO = z.object({
  body: z.object({
    staff_pass_id: z.string({
      required_error: "Staff Pass ID is required",
    }),
    team_name: z.string({
      required_error: "Team Name is required",
    }),
  }),
});
