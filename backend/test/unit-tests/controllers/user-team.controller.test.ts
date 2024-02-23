import {
  getAllUserTeamController,
  getStaffMappingByStaffIdController,
  updateTeamNameByStaffIdController,
} from "../../../src/controllers/user-team.controller";
import {
  getAllUserTeamService,
  getUserTeamByStaffIdService,
  updateUserTeamService,
} from "../../../src/services/user-team.service";
import { getUserByUsernameService } from "../../../src/services/user.service";
import { mockedData } from "../../helpers/mock-data";

jest.mock("../../../src/services/user-team.service", () => {
  return {
    getUserTeamByStaffIdService: jest.fn(),
    updateUserTeamService: jest.fn(),
    getAllUserTeamService: jest.fn(),
  };
});

jest.mock("../../../src/services/user.service", () => {
  return {
    getUserByUsernameService: jest.fn(),
  };
});

describe("UserTeam Controller", () => {
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

      (
        getUserTeamByStaffIdService as jest.MockedFunction<any>
      ).mockResolvedValue(mockedUserTeam);

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

      (
        getUserTeamByStaffIdService as jest.MockedFunction<any>
      ).mockRejectedValue(new Error("Error"));

      await getStaffMappingByStaffIdController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Internal Server Error",
      });
    });
  });

  describe("updateTeamNameByStaffIdController", () => {
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
      const req: any = {
        body: { staff_pass_id: "nonExistingUserId", team_name: "newTeamName" },
      };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };
      (
        getUserByUsernameService as jest.MockedFunction<any>
      ).mockResolvedValueOnce(null);
      await updateTeamNameByStaffIdController(req, res);

      expect(getUserByUsernameService).toHaveBeenCalledWith(
        "nonExistingUserId",
      );
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "User Not Found",
      });
    });

    it("should return 404 NOT FOUND if user's team can't be updated", async () => {
      const mockedUserTeam = mockedData.userTeam[0];
      const req: any = {
        body: {
          staff_pass_id: mockedUserTeam.staff_pass_id,
          team_name: mockedUserTeam.team_name,
        },
      };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (
        getUserByUsernameService as jest.MockedFunction<any>
      ).mockResolvedValueOnce(mockedUserTeam);
      await updateTeamNameByStaffIdController(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "User Team Not Updated",
      });
    });
    it("should return 200 OK and when updating user team name", async () => {
      const mockedUserTeam = mockedData.userTeam[0];
      const req: any = {
        body: {
          staff_pass_id: mockedUserTeam.staff_pass_id,
          team_name: mockedUserTeam.team_name,
        },
      };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getUserByUsernameService as jest.MockedFunction<any>).mockResolvedValue(
        mockedUserTeam,
      );

      (updateUserTeamService as jest.MockedFunction<any>).mockResolvedValue([
        1,
      ]);

      await updateTeamNameByStaffIdController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Success",
        data: [1],
      });
    });
    it("should return 500 Internal Server Error if an error occurs", async () => {
      const mockedUserTeam = mockedData.userTeam[0];
      const req: any = {
        body: {
          staff_pass_id: mockedUserTeam.staff_pass_id,
          team_name: mockedUserTeam.team_name,
        },
      };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getUserByUsernameService as jest.MockedFunction<any>).mockRejectedValue(
        new Error("Error"),
      );

      await updateTeamNameByStaffIdController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Internal Server Error",
      });
    });
  });
  describe("getAllUserTeamController", () => {
    beforeAll(() => {
      jest.spyOn(console, "error").mockImplementation(() => {});
    });
    afterAll(() => {
      (console.error as jest.MockedFunction<any>).mockRestore();
    });

    afterEach(() => {
      (console.error as jest.MockedFunction<any>).mockClear();
    });
    it("should return all user teams", async () => {
      const mockedUserTeams = mockedData.userTeam;
      const req: any = {};
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getAllUserTeamService as jest.MockedFunction<any>).mockResolvedValueOnce(
        mockedUserTeams,
      );

      await getAllUserTeamController(req, res);

      expect(getAllUserTeamService).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Success",
        data: mockedUserTeams,
      });
    });

    it("should return error when no user teams are found", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getAllUserTeamService as jest.MockedFunction<any>).mockResolvedValueOnce(
        null,
      );

      await getAllUserTeamController(req, res);

      expect(getAllUserTeamService).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "User Teams Not Found",
      });
    });
    it("should return 500 Internal Server Error if an error occurs", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getAllUserTeamService as jest.MockedFunction<any>).mockRejectedValue(
        new Error("Error"),
      );

      await getAllUserTeamController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Internal Server Error",
      });
    });
  });
});
