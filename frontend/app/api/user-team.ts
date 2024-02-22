import axios from "axios";
import { SERVER_DOMAIN, getServerToken } from "./config";

const GET_STAFF_TO_TEAM_ENDPOINT = `${SERVER_DOMAIN}/api/v1/user-team/mapping`;

export const getStaffToTeamMapping = async (staff_pass_id: string) => {
  return await axios.get(GET_STAFF_TO_TEAM_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${await getServerToken()}`,
    },
    params: staff_pass_id,
  });
};
