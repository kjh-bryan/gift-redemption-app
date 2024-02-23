import { Redemption } from "../../../src/models";
import {
  getAllRedemptionService,
  redeemGiftService,
  verifyRedemptionStatusService,
} from "../../../src/services/redemption.service";

jest.mock("../../../src/models", () => ({
  Redemption: {
    findOne: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
  },
}));

describe("Redemption Service", () => {
  describe("verifyRedemptionStatusService", () => {
    it("should return false if past redemptions found", async () => {
      const mockRedemption = { gift_name: "GiftA", team_name: "TeamA" };
      (Redemption as jest.MockedFunction<any>).findOne.mockResolvedValueOnce(
        mockRedemption,
      );

      const status = await verifyRedemptionStatusService("GiftA", "TeamA");

      expect(status).toBe(false);
      expect(Redemption.findOne).toHaveBeenCalledWith({
        where: { gift_name: "GiftA", team_name: "TeamA" },
      });
    });

    it("should return true if no past redemptions found", async () => {
      (Redemption.findOne as jest.MockedFunction<any>).mockResolvedValueOnce(
        null,
      );

      const status = await verifyRedemptionStatusService("GiftA", "TeamA");

      expect(status).toBe(true);
      expect(Redemption.findOne).toHaveBeenCalledWith({
        where: { gift_name: "GiftA", team_name: "TeamA" },
      });
    });

    it("should return false and log error if an error occurs", async () => {
      const mockError = new Error("Database error");
      (Redemption.findOne as jest.MockedFunction<any>).mockRejectedValueOnce(
        mockError,
      );
      const consoleErrorSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const status = await verifyRedemptionStatusService("GiftA", "TeamA");

      expect(status).toBe(false);
      expect(console.error).toHaveBeenCalledWith(
        "Error fetching past redemptions:",
        mockError,
      );
      consoleErrorSpy.mockRestore();
    });
  });

  describe("redeemGiftService", () => {
    it("should create and return a redemption", async () => {
      const mockRedemption = {
        gift_name: "GiftA",
        team_name: "TeamA",
        redeemed_at: new Date(),
      };
      (Redemption.create as jest.MockedFunction<any>).mockResolvedValueOnce(
        mockRedemption,
      );

      const redemption = await redeemGiftService("GiftA", "TeamA");

      expect(redemption).toEqual(mockRedemption);
      expect(Redemption.create).toHaveBeenCalledWith({
        gift_name: "GiftA",
        team_name: "TeamA",
        redeemed_at: expect.any(Date),
      });
    });

    it("should return null if redemption creation fails", async () => {
      (Redemption.create as jest.MockedFunction<any>).mockResolvedValueOnce(
        null,
      );

      const redemption = await redeemGiftService("GiftA", "TeamA");

      expect(redemption).toBeNull();
    });
  });

  describe("getAllRedemptionService", () => {
    it("should return all redemptions", async () => {
      const mockRedemptions = [
        { gift_name: "Redemption 1", team_name: "TeamA" },
        { gift_name: "Redemption 2", team_name: "TeamB" },
      ];
      (Redemption.findAll as jest.MockedFunction<any>).mockResolvedValue(
        mockRedemptions,
      );

      const result = await getAllRedemptionService();

      expect(Redemption.findAll).toHaveBeenCalledWith({ where: {} });

      expect(result).toEqual(mockRedemptions);
    });

    it("should return null if no redemptions are found", async () => {
      (Redemption.findAll as jest.MockedFunction<any>).mockResolvedValue(null);

      const result = await getAllRedemptionService();

      expect(Redemption.findAll).toHaveBeenCalledWith({ where: {} });

      expect(result).toBeNull();
    });
  });
});
