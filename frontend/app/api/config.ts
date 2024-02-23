import axios from "axios";
import { getSession } from "next-auth/react";

export const SERVER_DOMAIN: string = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

export const getServerToken = async () => {
  const session = await getSession();

  return session?.user.accessToken;
};
