import { Request, Response } from "express";
import {
  createUserTeamService,
  getUserTeamByStaffIdService,
  updateUserTeamService,
} from "../services/user-team.service";
import {
  createUserService,
  getUserByUsernameService,
} from "../services/user.service";

export const getStaffMappingByStaffIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { staff_pass_id } = req.query;

    if (!staff_pass_id) {
      return res.status(400).json({ error: "staff_pass_id is required" });
    }

    const userTeam = await getUserTeamByStaffIdService(String(staff_pass_id));

    if (!userTeam) {
      return res.status(404).json({ message: "User Team Not Found" });
    }
    return res.status(200).json({
      message: "Success",
      data: userTeam,
    });
  } catch (error) {
    console.error("Error fetching user team details: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateTeamNameByStaffIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { staff_pass_id, team_name } = req.body;

    const user = await getUserByUsernameService(staff_pass_id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const updatedUserTeam = await updateUserTeamService(
      String(staff_pass_id),
      String(team_name),
    );

    if (!updatedUserTeam) {
      return res.status(404).json({ message: "User Team Not Updated" });
    }

    return res.status(200).json({
      message: "Success",
      data: updatedUserTeam,
    });
  } catch (error) {
    console.error("Error updating user team details: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
