import axios from "axios";
import { SERVER_DOMAIN } from "./config";

const GET_ROLES_ENDPOINT = `${SERVER_DOMAIN}/api/v1/roles`;

export const getAllRoles = async () => {
  return await axios.get(GET_ROLES_ENDPOINT);
};
