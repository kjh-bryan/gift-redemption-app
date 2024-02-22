import { Gift } from "../models";

export const getAllGiftsService = async (): Promise<Gift[] | null> => {
  const gifts = await Gift.findAll();

  if (gifts) return gifts;
  return null;
};

export const getGiftByNameService = async (
  gift_name: string,
): Promise<Gift | null> => {
  const gifts = await Gift.findOne({
    where: {
      gift_name,
    },
  });

  if (gifts) return gifts;
  return null;
};

export const createGiftService = async (
  gift_name: string,
): Promise<Gift | null> => {
  const gifts = await Gift.create({
    gift_name,
    created_at: new Date(),
  });

  if (gifts) return gifts;
  return null;
};
