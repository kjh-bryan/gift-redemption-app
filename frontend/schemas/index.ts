import * as z from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(6, { message: "Username must be at least 6 characters long." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  team_name: z.string().min(1, {
    message: "Team name is required",
  }),
  role_name: z.string().min(1, {
    message: "Role is required",
  }),
});
