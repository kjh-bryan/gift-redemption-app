import {
  createGiftController,
  getAllGiftsController,
} from "../../../src/controllers/gift.controller";
import {
  createGiftService,
  getAllGiftsService,
  getGiftByNameService,
} from "../../../src/services/gift.service";
import { mockedData } from "../../helpers/mock-data";

jest.mock("../../../src/services/gift.service", () => {
  return {
    getAllGiftsService: jest.fn(),
    getGiftByNameService: jest.fn(),
    createGiftService: jest.fn(),
  };
});

describe("Gift Controller", () => {
  describe("getAllGiftsController", () => {
    beforeAll(() => {
      jest.spyOn(console, "error").mockImplementation(() => {});
    });
    afterAll(() => {
      (console.error as jest.MockedFunction<any>).mockRestore();
    });

    afterEach(() => {
      (console.error as jest.MockedFunction<any>).mockClear();
    });

    it("should return 200 OK and gifts", async () => {
      const mockedGifts = mockedData.gifts;
      const req: any = {};
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getAllGiftsService as jest.MockedFunction<any>).mockResolvedValue(
        mockedGifts,
      );

      await getAllGiftsController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Success",
        data: mockedGifts,
      });
    });

    it("should return 400 NOT FOUND if no gifts return", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getAllGiftsService as jest.MockedFunction<any>).mockResolvedValue(null);
      await getAllGiftsController(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Not Found",
      });
    });
    it("should return 500 Internal Server Error if an error occurs", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getAllGiftsService as jest.MockedFunction<any>).mockRejectedValue(
        new Error("Error"),
      );

      await getAllGiftsController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });
  describe("createGiftController", () => {
    beforeAll(() => {
      jest.spyOn(console, "error").mockImplementation(() => {});
    });
    afterAll(() => {
      (console.error as jest.MockedFunction<any>).mockRestore();
    });

    afterEach(() => {
      (console.error as jest.MockedFunction<any>).mockClear();
    });

    it("should return 200 OK and created gift", async () => {
      const mockedGifts = mockedData.gifts;
      const req: any = { body: { gift_name: mockedData.gifts[0].gift_name } };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getGiftByNameService as jest.MockedFunction<any>).mockResolvedValue(
        null,
      );
      (createGiftService as jest.MockedFunction<any>).mockResolvedValue(
        mockedGifts[0],
      );
      await createGiftController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Success",
        data: mockedGifts[0],
      });
    });

    it("should return 400 NOT FOUND if gift_name exist", async () => {
      const mockedGifts = mockedData.gifts;
      const req: any = { body: { gift_name: mockedData.gifts[0].gift_name } };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getGiftByNameService as jest.MockedFunction<any>).mockResolvedValue(
        mockedGifts[0],
      );
      await createGiftController(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Gift already exists",
      });
    });
    it("should return 400 NOT FOUND if cannot create gift", async () => {
      const mockedGifts = mockedData.gifts;
      const req: any = { body: { gift_name: mockedData.gifts[0].gift_name } };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getGiftByNameService as jest.MockedFunction<any>).mockResolvedValue(
        null,
      );
      (createGiftService as jest.MockedFunction<any>).mockResolvedValue(null);
      await createGiftController(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Unable to create gift",
      });
    });
    it("should return 500 Internal Server Error if an error occurs", async () => {
      const req: any = { query: { gift_name: "gift1", team_name: "team1" } };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getAllGiftsService as jest.MockedFunction<any>).mockRejectedValue(
        new Error("Error"),
      );

      await createGiftController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });
});
