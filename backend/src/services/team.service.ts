import { Team } from "../models";

export const getAllTeamsService = async (): Promise<Team[] | null> => {
  const teams = await Team.findAll({
    where: {},
  });

  if (teams) return teams;
  return null;
};
