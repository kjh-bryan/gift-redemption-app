import { getSession } from "next-auth/react";

export const SERVER_DOMAIN: string = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

export const getServerToken = async () => {
  const session = await getSession();
  console.log("session", session);

  return session?.user.accessToken;
};
