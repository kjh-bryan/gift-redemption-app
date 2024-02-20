import { Gift } from "../models";

export const getAllGiftsService = async () => {
  const gifts = await Gift.findAll();

  if (gifts) return gifts;
  return null;
};
