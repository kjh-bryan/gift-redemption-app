import { Team } from "../../../src/models";
import { getAllTeamsService } from "../../../src/services/team.service";

jest.mock("../../../src/models", () => ({
  Team: {
    findAll: jest.fn(),
  },
}));

describe("Team Service", () => {
  describe("getAllTeamsService", () => {
    it("should return all teams", async () => {
      const mockTeams = [{ team_name: "TeamA" }, { team_name: "TeamB" }];
      (Team.findAll as jest.MockedFunction<any>).mockResolvedValueOnce(
        mockTeams,
      );

      const teams = await getAllTeamsService();

      expect(teams).toEqual(mockTeams);
      expect(Team.findAll).toHaveBeenCalledWith({ where: {} });
    });

    it("should return null if no teams found", async () => {
      (Team.findAll as jest.MockedFunction<any>).mockResolvedValueOnce(null);

      const teams = await getAllTeamsService();

      expect(teams).toBeNull();
    });
  });
});
