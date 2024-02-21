import axios from "axios";
import { SERVER_DOMAIN } from "./config";
import { RedemptionProps } from "@/interfaces/types";

const VERIFY_REDEMPTION_ENDPOINT = `${SERVER_DOMAIN}/api/v1/gifts/verify-team`;

const REDEEM_GIFT_ENDPOINT = `${SERVER_DOMAIN}/api/v1/gifts/redeem`;

export const verifyRedemption = async (payload: RedemptionProps) => {
  return await axios.get(VERIFY_REDEMPTION_ENDPOINT, { params: payload });
};

export const redeemGift = async (payload: RedemptionProps) => {
  return await axios.post(REDEEM_GIFT_ENDPOINT, payload);
};
