import { Request, Response } from "express";
import {
  createTeamService,
  getAllTeamsService,
  getTeamByNameService,
} from "../services/team.service";

export const getAllTeamNamesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const teams = await getAllTeamsService();

    if (!teams) {
      return res.status(404).json({ message: "Teams Not Found" });
    }
    return res.status(200).json({
      message: "Success",
      data: teams,
    });
  } catch (error) {
    console.error("Error fetching all teams: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createTeamController = async (req: Request, res: Response) => {
  try {
    const { team_name } = req.body;

    const existingTeam = await getTeamByNameService(team_name);
    if (existingTeam) {
      return res.status(409).json({ message: "Team Already Exists" });
    }

    console.log("existingTeam :>> ", existingTeam);
    const newTeam = await createTeamService(String(team_name));

    if (!newTeam) {
      return res.status(404).json({ message: "Team Not Created" });
    }

    return res.status(200).json({
      message: "Success",
      data: newTeam,
    });
  } catch (error) {
    console.error("Error creating team: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
