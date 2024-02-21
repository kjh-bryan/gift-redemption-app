import { z } from "zod";

export const UsernameDTO = z.object({
  params: z.object({
    username: z.string({
      required_error: "Username is required",
    }),
  }),
});

export const RegisterUserDTO = z.object({
  body: z.object({
    username: z.string({
      required_error: "Username is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
    role_name: z.string({
      required_error: "Role is required",
    }),
    team_name: z.string({
      required_error: "Team is required",
    }),
  }),
});

export const LoginUserDTO = z.object({
  body: z.object({
    username: z.string({
      required_error: "Username is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});
