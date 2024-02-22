import { UserTeam } from "../../../src/models";
import {
  createUserTeamService,
  getUserTeamByStaffIdService,
} from "../../../src/services/user-team.service";

jest.mock("../../../src/models", () => ({
  UserTeam: {
    findOne: jest.fn(),
    create: jest.fn(),
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
});
