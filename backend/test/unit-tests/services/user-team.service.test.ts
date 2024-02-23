import { UserTeam } from "../../../src/models";
import {
  createUserTeamService,
  getAllUserTeamService,
  getUserTeamByStaffIdService,
  updateUserTeamService,
} from "../../../src/services/user-team.service";

jest.mock("../../../src/models", () => ({
  UserTeam: {
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
  },
}));

describe("UserTeam Service", () => {
  describe("getUserTeamByStaffIdService", () => {
    it("should return user team if found", async () => {
      const mockUserTeam = {
        staff_pass_id: "12345",
        team_name: "TeamA",
        created_at: new Date(),
      };

      (UserTeam.findOne as jest.MockedFunction<any>).mockResolvedValueOnce(
        mockUserTeam,
      );

      const userTeam = await getUserTeamByStaffIdService("12345");

      expect(userTeam).toEqual(mockUserTeam);
      expect(UserTeam.findOne).toHaveBeenCalledWith({
        where: { staff_pass_id: "12345" },
      });
    });

    it("should return null if user team not found", async () => {
      (UserTeam.findOne as jest.MockedFunction<any>).mockResolvedValueOnce(
        null,
      );

      const userTeam = await getUserTeamByStaffIdService("nonexistent_id");

      expect(userTeam).toBeNull();
    });
  });

  describe("createUserTeamService", () => {
    it("should create and return a user team", async () => {
      const created_at = new Date();
      const mockUserTeam = {
        staff_pass_id: "12345",
        team_name: "TeamA",
        created_at,
      };
      (UserTeam.create as jest.MockedFunction<any>).mockResolvedValueOnce(
        mockUserTeam,
      );

      const userTeam = await createUserTeamService("12345", "TeamA");

      console.log(userTeam);
      expect(userTeam).toEqual(mockUserTeam);
      expect(UserTeam.create).toHaveBeenCalledWith({
        staff_pass_id: "12345",
        team_name: "TeamA",
      });
    });

    it("should return null if user team creation fails", async () => {
      (UserTeam.create as jest.MockedFunction<any>).mockResolvedValueOnce(null);

      const userTeam = await createUserTeamService("12345", "TeamA");

      expect(userTeam).toBeNull();
    });
  });
  describe("updateUserTeamService", () => {
    it("should update the team_name of a user team", async () => {
      const mockUpdatedUserTeam = { affectedRows: 1 };
      (UserTeam.update as jest.MockedFunction<any>).mockResolvedValue(
        mockUpdatedUserTeam,
      );

      const result = await updateUserTeamService(
        "staff_pass_id_value",
        "new_team_name",
      );

      expect(UserTeam.update).toHaveBeenCalledWith(
        { team_name: "new_team_name" },
        { where: { staff_pass_id: "staff_pass_id_value" } },
      );

      expect(result).toEqual(mockUpdatedUserTeam);
    });
  });
  describe("getAllUserTeamService", () => {
    it("should return all user teams", async () => {
      // Mock the return value of the findAll method
      const mockUserTeams = [{ team_name: "Team 1" }, { team_name: "Team 2" }]; // Mock user team data
      (UserTeam.findAll as jest.MockedFunction<any>).mockResolvedValue(
        mockUserTeams,
      );

      const result = await getAllUserTeamService();

      expect(UserTeam.findAll).toHaveBeenCalled();

      expect(result).toEqual(mockUserTeams);
    });

    it("should return null if no user teams are found", async () => {
      // Mock the return value of the findAll method to return an empty array
      (UserTeam.findAll as jest.MockedFunction<any>).mockResolvedValue(null);

      const result = await getAllUserTeamService();

      expect(UserTeam.findAll).toHaveBeenCalled();

      expect(result).toBeNull();
    });
  });
});
