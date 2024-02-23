import axios from "axios";
import { SERVER_DOMAIN, getServerToken } from "./config";

const GET_USER_TEAMS_ENDPOINT = `${SERVER_DOMAIN}/api/v1/user-team/`;

const GET_STAFF_TO_TEAM_ENDPOINT = `${SERVER_DOMAIN}/api/v1/user-team/mapping`;
const CHANGE_TEAM_ENDPOINT = `${SERVER_DOMAIN}/api/v1/user-team/`;

export const getAllUserTeams = async () => {
  return await axios.get(GET_USER_TEAMS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${await getServerToken()}`,
    },
  });
};

export const getStaffToTeamMapping = async (staff_pass_id: string) => {
  return await axios.get(GET_STAFF_TO_TEAM_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${await getServerToken()}`,
    },
    params: staff_pass_id,
  });
};

export const changeTeam = async (staff_pass_id: string, team_name: string) => {
  return await axios.put(
    CHANGE_TEAM_ENDPOINT,
    {
      staff_pass_id,
      team_name,
    },
    {
      headers: {
        Authorization: `Bearer ${await getServerToken()}`,
      },
    },
  );
};
