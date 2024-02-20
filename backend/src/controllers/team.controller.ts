import { Request, Response } from "express";
import { getAllTeamsService } from "../services/team.service";

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
