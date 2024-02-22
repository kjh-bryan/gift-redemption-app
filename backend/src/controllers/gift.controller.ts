import { Request, Response } from "express";
import {
  createGiftService,
  getAllGiftsService,
  getGiftByNameService,
} from "../services/gift.service";

export const getAllGiftsController = async (req: Request, res: Response) => {
  try {
    const gifts = await getAllGiftsService();
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

export const createGiftController = async (req: Request, res: Response) => {
  try {
    const { gift_name } = req.body;
    const existingGift = await getGiftByNameService(gift_name);
    if (existingGift) {
      return res.status(400).json({ message: "Gift already exists" });
    }
    const gift = await createGiftService(gift_name);
    if (!gift) {
      return res.status(400).json({ message: "Unable to create gift" });
    }
    return res.status(200).json({
      message: "Success",
      data: gift,
    });
  } catch (error) {
    console.error("Error creating gift : ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
