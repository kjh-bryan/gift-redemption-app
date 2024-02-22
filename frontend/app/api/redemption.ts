import axios from "axios";
import { SERVER_DOMAIN, getServerToken } from "./config";
import { RedemptionProps } from "@/interfaces/types";

const VERIFY_REDEMPTION_ENDPOINT = `${SERVER_DOMAIN}/api/v1/gifts/verify-team`;

const REDEEM_GIFT_ENDPOINT = `${SERVER_DOMAIN}/api/v1/gifts/redeem`;

export const verifyRedemption = async (payload: RedemptionProps) => {
  return await axios.get(VERIFY_REDEMPTION_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${await getServerToken()}`,
    },
    params: payload,
  });
};

export const redeemGift = async (payload: RedemptionProps) => {
  console.log("redeemgift : redemption paload", payload);
  return await axios.post(REDEEM_GIFT_ENDPOINT, payload, {
    headers: {
      Authorization: `Bearer ${await getServerToken()}`,
    },
  });
};
