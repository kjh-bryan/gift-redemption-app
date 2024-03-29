import { Team } from "../models";

export const getAllTeamsService = async (): Promise<Team[] | null> => {
  const teams = await Team.findAll({
    where: {},
  });

  if (teams) return teams;
  return null;
};

export const getTeamByNameService = async (
  team_name: string,
): Promise<Team | null> => {
  const team = await Team.findOne({
    where: {
      team_name: team_name,
    },
  });

  if (team) return team;
  return null;
};

export const createTeamService = async (
  team_name: string,
): Promise<Team | null> => {
  const team = await Team.create({
    team_name,
  });

  if (team) return team;
  return null;
};

export const updateTeamService = async (
  team_name: string,
  new_team_name: string,
): Promise<number[] | null> => {
  const team = await Team.update(
    { team_name: new_team_name },
    {
      where: {
        team_name,
      },
    },
  );
  if (team) return team;
  return null;
};
