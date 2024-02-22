import { getSession } from "next-auth/react";

export const SERVER_DOMAIN: string = "http://localhost:5000";

export const getServerToken = async () => {
  const session = await getSession();
  console.log("session", session);

  return session?.user.accessToken;
};
