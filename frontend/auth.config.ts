import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "@/schemas";
import { LoginProps } from "./interfaces/types";
import { getUserByUsername, loginUser } from "./app/api/user";
import bcrypt from "bcryptjs";
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { username, password } = validatedFields.data;

          const user = await getUserByUsername(username);

          if (!user.data.data) return null;
          const passwordMatch = await bcrypt.compare(
            password,
            user.data.data.password,
          );
          if (passwordMatch) {
            const getUserToken = await loginUser({ username, password });
            user.data.data.accessToken = getUserToken.data.data.token;
            return user.data.data;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
