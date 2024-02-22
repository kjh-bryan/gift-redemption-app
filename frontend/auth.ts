import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { getUserByUsername } from "./app/api/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      if (session.user) {
        const { username, role_name, team_name, accessToken } = token;
        session.user.username = username as string;
        session.user.role_name = role_name as string;
        session.user.team_name = team_name as string;
        session.user.accessToken = accessToken as string;
      }

      return session;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});
