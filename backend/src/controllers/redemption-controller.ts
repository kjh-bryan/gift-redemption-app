import { Request, Response } from "express";
import { UserTeam } from "../models/user-team.model";
import { Redemption } from "../models/redemption.model";
import { Gift } from "../models/gift.model";
import { literal } from "sequelize";

export const getStaffMappingByStaffId = async (req: Request, res: Response) => {
  try {
    const { staff_pass_id } = req.query;

    if (!staff_pass_id) {
      return res.status(400).json({ error: "staff_pass_id is required" });
    }

    const userTeam = await UserTeam.findOne({
      where: { staff_pass_id: String(staff_pass_id).trim() },
    });

    if (!userTeam) {
      return res.status(400).json({ message: "Not Found" });
    }
    return res.status(200).json({
      message: "Success",
      data: userTeam,
    });
  } catch (error) {
    console.error("Error fetching user team details:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyRedemption = async (req: Request, res: Response) => {
  try {
    const { team_name } = req.query;

    if (!team_name) {
      return res.status(400).json({ error: "team_name is required" });
    }

    const canRedeem = await verifyRedemptionStatus(String(team_name));

    return res.status(200).json({ message: "Success", canRedeem });
  } catch (error) {
    console.error("Error fetching user team details:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getGifts = async (req: Request, res: Response) => {
  try {
    const gifts = await Gift.findAll();
    if (!gifts) {
      return res.status(400).json({ message: "Not Found" });
    }
    console.log(gifts);
    return res.status(200).json({
      message: "Success",
      data: gifts,
    });
  } catch (error) {
    console.error("Error fetching user team details:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const redeemGift = async (req: Request, res: Response) => {
  try {
    const { gift_name, team_name } = req.body;

    const canRedeem = await verifyRedemptionStatus(team_name);

    if (canRedeem) {
      const redemption = await Redemption.create({
        gift_name,
        team_name,
        redeemed_at: new Date(),
      });
      if (!redemption)
        return res.status(400).json({ message: "Unable to create redemption" });

      return res.status(200).json({ message: "Successfully redeemed" });
    } else {
      return res.status(400).json({ message: "Already redeemed" });
    }
  } catch (error) {
    console.error("Error fetching user team details:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const verifyRedemptionStatus = async (team_name: string): Promise<boolean> => {
  try {
    const pastRedemptions = await Redemption.findOne({
      where: { team_name: team_name },
    });
    return !pastRedemptions;
  } catch (error) {
    console.error("Error fetching past redemptions:", error);
    return false;
  }
};
