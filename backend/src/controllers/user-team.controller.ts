import { Request, Response } from "express";
import { getUserTeamByStaffIdService } from "../services/user-team.service";

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
