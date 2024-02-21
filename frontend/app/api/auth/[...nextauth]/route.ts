import { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "../../user";
import { LoginProps } from "@/interfaces/types";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username" },
        password: { label: "Password" },
      },
      async authorize(credentials) {
        const userCredentials: LoginProps = {
          username: credentials?.username ?? "",
          password: credentials?.password ?? "",
        };
        const authResponse = await loginUser(userCredentials);

        console.log("authResponse : ", authResponse);
        if (authResponse.status !== 200) {
          return null;
        }

        return authResponse.data.data;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
