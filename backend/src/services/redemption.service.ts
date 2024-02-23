import { Redemption } from "../models"; // Import your Sequelize model here

export const verifyRedemptionStatusService = async (
  gift_name: string,
  team_name: string,
): Promise<boolean> => {
  try {
    const pastRedemptions = await Redemption.findOne({
      where: { gift_name: gift_name, team_name: team_name },
    });
    return !pastRedemptions;
  } catch (error) {
    console.error("Error fetching past redemptions:", error);
    return false;
  }
};

export const redeemGiftService = async (
  gift_name: string,
  team_name: string,
): Promise<Redemption | null> => {
  const redemption = await Redemption.create({
    gift_name,
    team_name,
    redeemed_at: new Date(),
  });

  if (redemption) return redemption;
  return null;
};

export const getAllRedemptionService = async (): Promise<
  Redemption[] | null
> => {
  const redemptions = await Redemption.findAll({
    where: {},
  });

  if (redemptions) return redemptions;
  return null;
};
