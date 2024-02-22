import { Gift } from "../../../src/models";
import {
  createGiftService,
  getAllGiftsService,
  getGiftByNameService,
} from "../../../src/services/gift.service";

jest.mock("../../../src/models", () => ({
  Gift: {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

describe("Gift Service", () => {
  describe("getAllGiftsService", () => {
    it("should return all gifts", async () => {
      const mockGifts = [
        { gift_name: "GiftA", created_at: new Date() },
        { gift_name: "GiftB", created_at: new Date() },
      ];
      (Gift.findAll as jest.MockedFunction<any>).mockResolvedValueOnce(
        mockGifts,
      );

      const gifts = await getAllGiftsService();

      expect(gifts).toEqual(mockGifts);
      expect(Gift.findAll).toHaveBeenCalled();
    });

    it("should return null if no gifts found", async () => {
      (Gift.findAll as jest.MockedFunction<any>).mockResolvedValueOnce(null);

      const gifts = await getAllGiftsService();

      expect(gifts).toBeNull();
      expect(Gift.findAll).toHaveBeenCalled();
    });
  });

  describe("getGiftByNameService", () => {
    it("should return gift by name if found", async () => {
      const mockGift = { gift_name: "GiftA", created_at: new Date() };
      (Gift.findOne as jest.MockedFunction<any>).mockResolvedValueOnce(
        mockGift,
      );

      const gift = await getGiftByNameService("GiftA");

      expect(gift).toEqual(mockGift);
      expect(Gift.findOne).toHaveBeenCalledWith({
        where: { gift_name: "GiftA" },
      });
    });

    it("should return null if gift not found", async () => {
      (Gift as jest.MockedFunction<any>).findOne.mockResolvedValueOnce(null);

      const gift = await getGiftByNameService("NonExistentGift");

      expect(gift).toBeNull();
      expect(Gift.findOne).toHaveBeenCalledWith({
        where: { gift_name: "NonExistentGift" },
      });
    });
  });

  describe("createGiftService", () => {
    it("should create and return a gift", async () => {
      const mockGift = { gift_name: "GiftA", created_at: new Date() };
      (Gift.create as jest.MockedFunction<any>).mockResolvedValueOnce(mockGift);

      const gift = await createGiftService("GiftA");

      expect(gift).toEqual(mockGift);
      expect(Gift.create).toHaveBeenCalledWith({
        gift_name: "GiftA",
        created_at: expect.any(Date),
      });
    });

    it("should return null if gift creation fails", async () => {
      (Gift.create as jest.MockedFunction<any>).mockResolvedValueOnce(null);

      const gift = await createGiftService("GiftA");

      expect(gift).toBeNull();
      expect(Gift.create).toHaveBeenCalledWith({
        gift_name: "GiftA",
        created_at: expect.any(Date),
      });
    });
  });
});
