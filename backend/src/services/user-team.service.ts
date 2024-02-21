import { UserTeam } from "../models";

export const getUserTeamByStaffIdService = async (staff_pass_id: string) => {
  const userTeam = await UserTeam.findOne({
    where: { staff_pass_id: staff_pass_id.trim() },
  });

  if (userTeam) return userTeam;
  return null;
};

export const createUserTeamService = async (
  staff_pass_id: string,
  team_name: string,
) => {
  const userTeam = await UserTeam.create({
    staff_pass_id: staff_pass_id,
    team_name: team_name,
  });

  if (userTeam) return userTeam;
  return null;
};
