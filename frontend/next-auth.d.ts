import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role_name: string;
  username: string;
  team_name: string;
  accessToken: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
