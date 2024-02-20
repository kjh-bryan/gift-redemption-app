import request from "supertest";
import app from "../../../src/app";
import { mockedData } from "../../helpers/redemption-controller-mock-data";
import {
  getUserTeamByStaffIdService,
  verifyRedemptionStatusService,
} from "../../../src/services/redemption.service";
import {
  getStaffMappingByStaffIdController,
  verifyRedemptionController,
} from "../../../src/controllers/redemption.controller";
import { Request } from "express";
jest.mock("../../../src/services/redemption.service", () => {
  return {
    getUserTeamByStaffIdService: jest.fn(),
    verifyRedemptionStatusService: jest.fn(),
  };
});

describe("getStaffMappingByStaffIdController", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterAll(() => {
    (console.error as jest.MockedFunction<any>).mockRestore();
  });

  afterEach(() => {
    (console.error as jest.MockedFunction<any>).mockClear();
  });
  it("should return 404 NOT FOUND for incorrect staff ID", async () => {
    const req: any = { query: { staff_pass_id: "incorrect_id" } };
    const res: any = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getStaffMappingByStaffIdController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "User Team Not Found",
    });
  });

  it("should return 400 NOT FOUND if no staff pass id is passed", async () => {
    const req: any = { query: {} };
    const res: any = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await getStaffMappingByStaffIdController(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
  it("should return 200 OK and the correct team for a valid staff ID", async () => {
    const mockedUserTeam = mockedData.teamMapping;
    const req: any = { query: { staff_pass_id: "STAFF" } };
    const res: any = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    (getUserTeamByStaffIdService as jest.MockedFunction<any>).mockResolvedValue(
      mockedUserTeam,
    );

    await getStaffMappingByStaffIdController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Success",
      data: mockedUserTeam,
    });
  });
  it("should return 500 Internal Server Error if an error occurs", async () => {
    const req: any = { query: { staff_pass_id: "STAFF" } };
    const res: any = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    (getUserTeamByStaffIdService as jest.MockedFunction<any>).mockRejectedValue(
      new Error("Error"),
    );

    await getStaffMappingByStaffIdController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Internal Server Error",
    });
  });
});
describe("verifyRedemptionController", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterAll(() => {
    (console.error as jest.MockedFunction<any>).mockRestore();
  });

  afterEach(() => {
    (console.error as jest.MockedFunction<any>).mockClear();
  });
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
    const req: any = { query: { gift_name: "gift1", team_name: "team1" } };
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

    // Mocking service to throw an error
    (
      verifyRedemptionStatusService as jest.MockedFunction<any>
    ).mockRejectedValue(new Error("Error"));

    await verifyRedemptionController(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});
