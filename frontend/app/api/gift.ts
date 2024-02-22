import axios from "axios";
import { SERVER_DOMAIN, getServerToken } from "./config";
import { getSession, useSession } from "next-auth/react";

const GET_GIFTS_ENDPOINT = `${SERVER_DOMAIN}/api/v1/gifts`;
const CREATE_GIFT_ENDPOINT = `${SERVER_DOMAIN}/api/v1/gifts`;

export const getAllGifts = async () => {
  return await axios.get(GET_GIFTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${await getServerToken()}`,
    },
  });
};
export const createGift = async (gift_name: string) => {
  return await axios.post(
    CREATE_GIFT_ENDPOINT,
    { gift_name },
    {
      headers: {
        Authorization: `Bearer ${await getServerToken()}`,
      },
    },
  );
};
