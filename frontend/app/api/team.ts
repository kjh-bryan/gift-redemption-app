import axios from "axios";
import { SERVER_DOMAIN, getServerToken } from "./config";

const GET_TEAMS_ENDPOINT = `${SERVER_DOMAIN}/api/v1/teams`;
const CREATE_TEAM_ENDPOINT = `${SERVER_DOMAIN}/api/v1/teams`;

export const getAllTeams = async () => {
  return await axios.get(GET_TEAMS_ENDPOINT);
};

export const createTeam = async (team_name: string) => {
  return await axios.post(
    CREATE_TEAM_ENDPOINT,
    { team_name },
    {
      headers: {
        Authorization: `Bearer ${await getServerToken()}`,
      },
    },
  );
};
