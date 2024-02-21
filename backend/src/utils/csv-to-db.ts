import fs from "fs";
import csvParser from "csv-parser";
import { UserAttributes } from "../models/user.model";
import { Team, TeamAttributes } from "../models/team.model";
import { UserTeamAttributes } from "../models/user-team.model";
import { RoleAttributes } from "../models";

const filePath = "data/staff-id-to-team-mapping-long.csv";

export const csvToDb = async (): Promise<{
  users: UserAttributes[];
  roles: RoleAttributes[];
  teams: TeamAttributes[];
  user_teams: UserTeamAttributes[];
}> => {
  return new Promise((resolve, reject) => {
    const users: UserAttributes[] = [];
    const teamSets: Set<string> = new Set();
    const roleSets: Set<string> = new Set();
    const user_teams: UserTeamAttributes[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => {
        const role_name = data.staff_pass_id.split("_")[0];
        const user: UserAttributes = {
          username: data.staff_pass_id,
          password: data.team_name,
          role_name,
        };
        users.push(user);

        teamSets.add(data.team_name);
        roleSets.add(role_name);
        const createdAtTimestamp = parseInt(data.created_at);
        const createdAtDate = new Date(createdAtTimestamp);
        const user_team: UserTeamAttributes = {
          staff_pass_id: data.staff_pass_id,
          team_name: data.team_name,
          created_at: createdAtDate,
        };
        user_teams.push(user_team);
      })
      .on("end", () => {
        const teams: TeamAttributes[] = [];
        teamSets.forEach((teamName) => {
          teams.push({ team_name: teamName });
        });

        const roles: RoleAttributes[] = [];
        roleSets.forEach((roleName) => {
          roles.push({ role_name: roleName });
        });

        resolve({ users, roles, teams, user_teams });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};
