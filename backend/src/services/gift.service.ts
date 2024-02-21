import { Gift } from "../models";

export const getAllGiftsService = async (): Promise<Gift[] | null> => {
  const gifts = await Gift.findAll();

  if (gifts) return gifts;
  return null;
};
