import { getAllTeamNamesController } from "../../../src/controllers/team.controller";
import { getAllTeamsService } from "../../../src/services/team.service";
import { mockedData } from "../../helpers/mock-data";

jest.mock("../../../src/services/team.service", () => {
  return {
    getAllTeamsService: jest.fn(),
  };
});

describe("Team Controller", () => {
  describe("getAllTeamNamesController", () => {
    beforeAll(() => {
      jest.spyOn(console, "error").mockImplementation(() => {});
    });
    afterAll(() => {
      (console.error as jest.MockedFunction<any>).mockRestore();
    });

    afterEach(() => {
      (console.error as jest.MockedFunction<any>).mockClear();
    });

    it("should return 200 OK and teams", async () => {
      const mockedTeams = mockedData.teams;
      const req: any = {};
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getAllTeamsService as jest.MockedFunction<any>).mockResolvedValue(
        mockedTeams,
      );

      await getAllTeamNamesController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Success",
        data: mockedTeams,
      });
    });

    it("should return 404 NOT FOUND if no teams return", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getAllTeamsService as jest.MockedFunction<any>).mockResolvedValue(null);
      await getAllTeamNamesController(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Teams Not Found",
      });
    });
    it("should return 500 Internal Server Error if an error occurs", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getAllTeamsService as jest.MockedFunction<any>).mockRejectedValue(
        new Error("Error"),
      );

      await getAllTeamNamesController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });
});
