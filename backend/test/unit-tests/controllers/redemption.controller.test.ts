import { mockedData } from "../../helpers/mock-data";
import {
  verifyRedemptionStatusService,
  redeemGiftService,
  getAllRedemptionService,
} from "../../../src/services/redemption.service";
import {
  getRedemptionByTeamController,
  redeemGiftController,
  verifyRedemptionController,
} from "../../../src/controllers/redemption.controller";

jest.mock("../../../src/services/redemption.service", () => {
  return {
    verifyRedemptionStatusService: jest.fn(),
    redeemGiftService: jest.fn(),
    getAllRedemptionService: jest.fn(),
  };
});

describe("Redemption Controller", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterAll(() => {
    (console.error as jest.MockedFunction<any>).mockRestore();
  });

  afterEach(() => {
    (console.error as jest.MockedFunction<any>).mockClear();
  });
  describe("verifyRedemptionController", () => {
    it("should return 400 NOT FOUND if team_name is missing", async () => {
      const req: any = { query: { gift_name: "gift1" } };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await verifyRedemptionController(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "team_name is required" });
    });

    it("should return 400 NOT FOUND if gift_name is missing", async () => {
      const req: any = { query: { team_name: "team1" } };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await verifyRedemptionController(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "gift_name is required" });
    });
    it("should return 200 OK with the result from service if inputs are valid", async () => {
      const req: any = {
        query: {
          gift_name: "Books Gift Voucher Feb 2024",
          team_name: "GRYFFINDOR",
        },
      };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (
        verifyRedemptionStatusService as jest.MockedFunction<any>
      ).mockResolvedValue(true);

      await verifyRedemptionController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Success",
        canRedeem: true,
      });
    });
    it("should return 500 Internal Server Error if an error occurs", async () => {
      const req: any = { query: { gift_name: "gift1", team_name: "team1" } };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (
        verifyRedemptionStatusService as jest.MockedFunction<any>
      ).mockRejectedValue(new Error("Error"));

      await verifyRedemptionController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });

  describe("redeemGiftController", () => {
    it("should return 200 OK where gift are successfully redeemed", async () => {
      const mockedRedemption = mockedData.redemption;
      const req: any = {
        body: {
          gift_name: "Books Gift Voucher Feb 2024",
          team_name: "GRYFFINDOR",
        },
      };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      (
        verifyRedemptionStatusService as jest.MockedFunction<any>
      ).mockResolvedValue(true);

      (redeemGiftService as jest.MockedFunction<any>).mockResolvedValue(
        mockedRedemption,
      );

      await redeemGiftController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Successfully redeemed",
      });
    });
    it("should return 400 NOT FOUND when redemption can't be created", async () => {
      const req: any = {
        body: {
          gift_name: "Books Gift Voucher Feb 2024",
          team_name: "GRYFFINDOR",
        },
      };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      (
        verifyRedemptionStatusService as jest.MockedFunction<any>
      ).mockResolvedValue(true);

      (redeemGiftService as jest.MockedFunction<any>).mockResolvedValue(null);

      await redeemGiftController(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Unable to create redemption",
      });
    });

    it("should return 400 NOT FOUND when gift is already redeemed", async () => {
      const req: any = {
        body: {
          gift_name: "Books Gift Voucher Feb 2024",
          team_name: "GRYFFINDOR",
        },
      };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      (
        verifyRedemptionStatusService as jest.MockedFunction<any>
      ).mockResolvedValue(false);

      await redeemGiftController(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Already redeemed",
      });
    });
    it("should return 500 Internal Server Error if an error occurs", async () => {
      const mockedRedemption = mockedData.redemption;
      const req: any = {
        body: {
          gift_name: mockedRedemption.gift_name,
          team_name: mockedRedemption.team_name,
        },
      };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      (
        verifyRedemptionStatusService as jest.MockedFunction<any>
      ).mockRejectedValue(new Error("Error"));

      (redeemGiftService as jest.MockedFunction<any>).mockRejectedValue(
        new Error("Error"),
      );

      await redeemGiftController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });

  describe("getRedemptionByTeamController", () => {
    it("should return 200 and all redemptions successfully", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      const redemptionData = [{ team_name: "Team1", gift_name: "Gift1" }];
      (
        getAllRedemptionService as jest.MockedFunction<any>
      ).mockResolvedValueOnce(redemptionData);

      await getRedemptionByTeamController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Success",
        data: redemptionData,
      });
    });

    it("should return 400 and unable to fetch redemption ", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (
        getAllRedemptionService as jest.MockedFunction<any>
      ).mockResolvedValueOnce(null);

      await getRedemptionByTeamController(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Unable to fetch redemption",
      });
    });

    it("should handle errors", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      // Mock the getAllRedemptionService function to throw an error
      (
        getAllRedemptionService as jest.MockedFunction<any>
      ).mockRejectedValueOnce(new Error("Test error"));

      // Call the controller function
      await getRedemptionByTeamController(req, res);

      // Assert the response
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });
});
