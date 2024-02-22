import { getStaffMappingByStaffIdController } from "../../../src/controllers/user-team.controller";
import { getUserTeamByStaffIdService } from "../../../src/services/user-team.service";
import { mockedData } from "../../helpers/mock-data";

jest.mock("../../../src/services/user-team.service", () => {
  return {
    getUserTeamByStaffIdService: jest.fn(),
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
});
