import { Team } from "../../../src/models";
import {
  createTeamService,
  getAllTeamsService,
  getTeamByNameService,
  updateTeamService,
} from "../../../src/services/team.service";

jest.mock("../../../src/models", () => ({
  Team: {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
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
  describe("createTeamService", () => {
    it("should create a new team", async () => {
      const mockNewTeam = { team_name: "New Team" };
      (Team.create as jest.MockedFunction<any>).mockResolvedValue(mockNewTeam);

      const result = await createTeamService("New Team");

      expect(Team.create).toHaveBeenCalledWith({ team_name: "New Team" });

      expect(result).toEqual(mockNewTeam);
    });

    it("should return null if team creation fails", async () => {
      (Team.create as jest.MockedFunction<any>).mockResolvedValue(null);

      const result = await createTeamService("Invalid Team");

      expect(Team.create).toHaveBeenCalledWith({ team_name: "Invalid Team" });

      expect(result).toBeNull();
    });
  });

  describe("updateTeamService", () => {
    it("should update the team name", async () => {
      const affectedRows = [1];
      (Team.update as jest.MockedFunction<any>).mockResolvedValue(affectedRows);

      const result = await updateTeamService("Old Team", "New Team");

      expect(Team.update).toHaveBeenCalledWith(
        { team_name: "New Team" },
        { where: { team_name: "Old Team" } },
      );

      expect(result).toEqual(affectedRows);
    });

    it("should return null if team update fails", async () => {
      (Team.update as jest.MockedFunction<any>).mockResolvedValue(null);

      const result = await updateTeamService("Nonexistent Team", "New Team");

      expect(Team.update).toHaveBeenCalledWith(
        { team_name: "New Team" },
        { where: { team_name: "Nonexistent Team" } },
      );

      expect(result).toBeNull();
    });
  });
  describe("getTeamByNameService", () => {
    it("should get a team by name", async () => {
      const mockTeam = { team_name: "Existing Team" };
      (Team.findOne as jest.MockedFunction<any>).mockResolvedValue(mockTeam);

      const result = await getTeamByNameService("Existing Team");

      expect(Team.findOne).toHaveBeenCalledWith({
        where: { team_name: "Existing Team" },
      });
      expect(result).toEqual(mockTeam);
    });

    it("should return null if team does not exist", async () => {
      (Team.findOne as jest.MockedFunction<any>).mockResolvedValue(null);

      const result = await getTeamByNameService("Nonexistent Team");

      expect(Team.findOne).toHaveBeenCalledWith({
        where: { team_name: "Nonexistent Team" },
      });
      expect(result).toBeNull();
    });
  });
});
