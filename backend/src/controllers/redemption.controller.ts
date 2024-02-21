import { Request, Response } from "express";
import {
  redeemGiftService,
  verifyRedemptionStatusService,
} from "../services/redemption.service";

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

export const redeemGiftController = async (req: Request, res: Response) => {
  try {
    const { gift_name, team_name } = req.body;
    const canRedeem = await verifyRedemptionStatusService(gift_name, team_name);

    if (canRedeem) {
      const redemption = await redeemGiftService(gift_name, team_name);
      if (!redemption)
        return res.status(400).json({ message: "Unable to create redemption" });

      // return res.status(200).json({ message: "Successfully redeemed" });
    } else {
      return res.status(400).json({ message: "Already redeemed" });
    }
  } catch (error) {
    console.error("Error redeeming gift: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
