import axios from "axios";
import { SERVER_DOMAIN } from "./config";

const GET_TEAMS_ENDPOINT = `${SERVER_DOMAIN}/api/v1/teams`;

export const getAllTeams = async () => {
  return await axios.get(GET_TEAMS_ENDPOINT);
};
