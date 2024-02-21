import { Request, Response } from "express";
import { getAllRolesService } from "../services/role.service";

export const getAllRolesController = async (req: Request, res: Response) => {
  try {
    const roles = await getAllRolesService();

    if (!roles) {
      return res.status(404).json({ message: "Roles Not Found" });
    }
    return res.status(200).json({
      message: "Success",
      data: roles,
    });
  } catch (error) {
    console.error("Error fetching all roles: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
