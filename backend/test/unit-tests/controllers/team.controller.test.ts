import {
  createTeamController,
  getAllTeamNamesController,
  updateTeamController,
} from "../../../src/controllers/team.controller";
import {
  createTeamService,
  getAllTeamsService,
  getTeamByNameService,
  updateTeamService,
} from "../../../src/services/team.service";
import { mockedData } from "../../helpers/mock-data";

jest.mock("../../../src/services/team.service", () => {
  return {
    getAllTeamsService: jest.fn(),
    getTeamByNameService: jest.fn(),
    updateTeamService: jest.fn(),
    createTeamService: jest.fn(),
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

  describe("updateTeamController", () => {
    beforeAll(() => {
      jest.spyOn(console, "error").mockImplementation(() => {});
    });
    afterAll(() => {
      (console.error as jest.MockedFunction<any>).mockRestore();
    });

    afterEach(() => {
      (console.error as jest.MockedFunction<any>).mockClear();
    });
    it("should return 404 if team does not exist", async () => {
      const req: any = {
        body: {
          team_name: "nonExistingTeamName",
          new_team_name: "newTeamName",
        },
      };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      (getTeamByNameService as jest.MockedFunction<any>).mockResolvedValueOnce(
        null,
      );
      await updateTeamController(req, res);

      expect(getTeamByNameService).toHaveBeenCalledWith("nonExistingTeamName");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Team Not Found",
      });
    });

    it("should return 404 if team is not updated", async () => {
      const existingTeam = { team_name: "Existing Team" };
      const req: any = {
        body: {
          team_name: "Existing Team",
          new_team_name: "Updated Team",
        },
      };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getTeamByNameService as jest.MockedFunction<any>).mockResolvedValueOnce(
        existingTeam,
      );

      (updateTeamService as jest.MockedFunction<any>).mockResolvedValueOnce(
        null,
      );

      await updateTeamController(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Team Not Updated" });
    });
    it("should return 200 OK and when updating user team name", async () => {
      const existingTeam = { team_name: "Existing Team" };
      const updatedTeam = { team_name: "Updated Team" };
      const req: any = {
        body: { team_name: "Existing Team", new_team_name: "Updated Team" },
      };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getTeamByNameService as jest.MockedFunction<any>).mockResolvedValue(
        existingTeam,
      );

      (updateTeamService as jest.MockedFunction<any>).mockResolvedValue([1]);

      await updateTeamController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Success",
        data: [1],
      });
    });
    it("should return 500 Internal Server Error if an error occurs", async () => {
      const req: any = {
        body: { team_name: "Existing Team", new_team_name: "Updated Team" },
      };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getTeamByNameService as jest.MockedFunction<any>).mockRejectedValue(
        new Error("Error"),
      );

      await updateTeamController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Internal Server Error",
      });
    });
  });

  describe("createTeamController", () => {
    beforeAll(() => {
      jest.spyOn(console, "error").mockImplementation(() => {});
      (getTeamByNameService as jest.MockedFunction<any>).mockClear();
      (createTeamService as jest.MockedFunction<any>).mockClear();
    });
    afterAll(() => {
      (console.error as jest.MockedFunction<any>).mockRestore();
    });

    afterEach(() => {
      (console.error as jest.MockedFunction<any>).mockClear();
    });
    it("should return 409 if team does not exist", async () => {
      const req: any = {
        body: { team_name: "existingTeam" },
      };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      (getTeamByNameService as jest.MockedFunction<any>).mockResolvedValueOnce({
        team_name: "existingTeam",
      });
      await createTeamController(req, res);

      expect(getTeamByNameService).toHaveBeenCalledWith("existingTeam");
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        message: "Team Already Exists",
      });
    });

    it("should return 404 if team is not created", async () => {
      const req: any = {
        body: { team_name: "New Team" },
      };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getTeamByNameService as jest.MockedFunction<any>).mockResolvedValueOnce(
        null,
      );

      (createTeamService as jest.MockedFunction<any>).mockResolvedValueOnce(
        null,
      );

      await createTeamController(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Team Not Created" });
    });
    it("should return 200 OK and when created user team name", async () => {
      const newTeam = { team_name: "New Team" };
      const req: any = {
        body: { team_name: "New Team" },
      };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getTeamByNameService as jest.MockedFunction<any>).mockResolvedValue(
        null,
      );

      (createTeamService as jest.MockedFunction<any>).mockResolvedValue(
        newTeam,
      );

      await createTeamController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Success",
        data: newTeam,
      });
    });
    it("should return 500 Internal Server Error if an error occurs", async () => {
      const req: any = {
        body: { team_name: "New Team" },
      };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getTeamByNameService as jest.MockedFunction<any>).mockRejectedValue(
        new Error("Error"),
      );

      await createTeamController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Internal Server Error",
      });
    });
  });
});
