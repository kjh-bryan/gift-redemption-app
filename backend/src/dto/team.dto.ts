import { z } from "zod";

export const CreateTeamDTO = z.object({
  body: z.object({
    team_name: z.string({
      required_error: "Team name is required",
    }),
  }),
});
