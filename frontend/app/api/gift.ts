import axios from "axios";
import { SERVER_DOMAIN } from "./config";

const GET_GIFTS_ENDPOINT = `${SERVER_DOMAIN}/api/v1/redemption/gifts`;

export const getAllGifts = async () => {
  return await axios.get(GET_GIFTS_ENDPOINT);
};
