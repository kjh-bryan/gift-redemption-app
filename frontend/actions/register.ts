"use client";

import { getUserByUsername, registerUser } from "@/app/api/user";
import { RegisterProps } from "@/interfaces/types";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  console.log(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { username, password, team_name, role_name } = validatedFields.data;
  const existingUser = await getUserByUsername(username);
  console.log("existingUser : ", existingUser);
  if (existingUser.data.data) {
    return { error: "User already exist!" };
  }
  const formatedUsername = role_name + "_" + username;
  const registeredUser = await registerUser({
    username: formatedUsername,
    password,
    team_name,
    role_name,
  });

  console.log("registeredUser :", registeredUser);
  if (registeredUser.status === 401 || registeredUser.status === 402) {
    return { error: "Unable to register!" };
  }
  return { success: "Registration successful!" };
};
