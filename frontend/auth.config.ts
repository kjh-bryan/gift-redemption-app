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
        // console.log("credentials", credentials);
        // const validatedFields = LoginSchema.safeParse(credentials);
        // console.log(" async authorize(credentials) : ", validatedFields);
        // if (validatedFields.success) {
        //   const { username, password } = validatedFields.data;

        //   const userCredentials: LoginProps = {
        //     username: username,
        //     password: password,
        //   };
        //   const user = await getUserByUsername(username);
        //   if (!user.data) return null;

        //   const passwordMatch = await bcrypt.compare(
        //     password,
        //     user.data.data.password,
        //   );

        //   if (passwordMatch) {
        //     console.log("authorized returning user.data.data ", user.data.data);
        //     return user.data;
        //   }
        //   console.log("authorized exitting ");
        // }
        // console.log("authorized returning null ");
        // return null;

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
            console.log("getUserToken", getUserToken.data.data);
            user.data.data.accessToken = getUserToken.data.data.token;
            return user.data.data;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
