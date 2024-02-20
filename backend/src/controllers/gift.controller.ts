import { Request, Response } from "express";
import { getAllGiftsService } from "../services/gift.service";

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
