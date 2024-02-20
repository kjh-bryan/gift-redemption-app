import { Request, Response } from "express";
import {
  getGiftsService,
  getUserTeamByStaffIdService,
  redeemGiftService,
  verifyRedemptionStatusService,
} from "../services/redemption.service";

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

export const verifyRedemptionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { gift_name, team_name } = req.query;

    if (!team_name) {
      return res.status(400).json({ error: "team_name is required" });
    }
    if (!gift_name) {
      return res.status(400).json({ error: "gift_name is required" });
    }
    const canRedeem = await verifyRedemptionStatusService(
      String(gift_name),
      String(team_name),
    );

    return res.status(200).json({ message: "Success", canRedeem });
  } catch (error) {
    console.error("Error verifying redemptions: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getGiftsController = async (req: Request, res: Response) => {
  try {
    const gifts = await getGiftsService();
    if (!gifts) {
      return res.status(400).json({ message: "Not Found" });
    }
    return res.status(200).json({
      message: "Success",
      data: gifts,
    });
  } catch (error) {
    console.error("Error fetching gifts detail: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const redeemGiftController = async (req: Request, res: Response) => {
  try {
    const { gift_name, team_name } = req.body;

    const canRedeem = await verifyRedemptionStatusService(gift_name, team_name);

    if (canRedeem) {
      const redemption = await redeemGiftService(gift_name, team_name);
      if (!redemption)
        return res.status(400).json({ message: "Unable to create redemption" });

      return res.status(200).json({ message: "Successfully redeemed" });
    } else {
      return res.status(400).json({ message: "Already redeemed" });
    }
  } catch (error) {
    console.error("Error redeeming gift: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
