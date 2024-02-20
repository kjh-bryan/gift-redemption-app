import { UserTeam } from "../models";

export const getUserTeamByStaffIdService = async (staffPassId: string) => {
  const userTeam = await UserTeam.findOne({
    where: { staff_pass_id: staffPassId.trim() },
  });

  if (userTeam) return userTeam;
  return null;
};
