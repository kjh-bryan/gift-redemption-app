"use server";

import { getUserByUsername } from "@/app/api/user";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { username, password } = validatedFields.data;

  const existingUser = await getUserByUsername(username);

  if (existingUser.data.message === "User Not Found") {
    return { error: "User does not exist!" };
  }
  if (existingUser.data.error === "Internal Server Error") {
    return { error: "Internal Server Error" };
  }
  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("error type : ", error.type);
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
