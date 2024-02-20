import { Model } from "sequelize";
import { Team } from "../models"; // Import your Sequelize model here

export const getAllTeamsService = async (): Promise<Model[] | null> => {
  const teams = await Team.findAll({
    where: {},
  });

  if (teams) return teams;
  return null;
};
