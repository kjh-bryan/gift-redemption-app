import { Op } from "sequelize";
import { User, UserTeam } from "../../../src/models";
import {
  createUserService,
  getAllUserService,
  getUserByUsernameService,
} from "../../../src/services/user.service";

jest.mock("../../../src/models", () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
  },
}));

describe("User Service", () => {
  describe("getAllUserService", () => {
    it("should return all users with their teams", async () => {
      // Mock the data returned by findAll method
      const mockUsers = [
        {
          username: "user1",
          // other user properties
          UserTeams: [
            {
              team_name: "team1",
              created_at: "2021-01-01",
            },
          ],
        },
        {
          username: "user2",
          // other user properties
          UserTeams: [
            {
              team_name: "team2",
              created_at: "2021-02-02",
            },
          ],
        },
      ];
      // Mock the implementation of findAll method to return the mockUsers
      (User.findAll as jest.MockedFunction<any>).mockResolvedValue(mockUsers);

      // Call the service function
      const result = await getAllUserService();

      // Assert that findAll method was called with correct options
      expect(User.findAll).toHaveBeenCalledWith({
        include: [
          {
            model: UserTeam,
            attributes: ["team_name", "created_at"],
          },
        ],
      });

      // Assert that the result matches the expected data
      expect(result).toEqual(mockUsers);
    });

    it("should return null if no users are found", async () => {
      // Mock the implementation of findAll method to return an empty array
      (User.findAll as jest.MockedFunction<any>).mockResolvedValue(null);

      // Call the service function
      const result = await getAllUserService();

      // Assert that findAll method was called with correct options
      expect(User.findAll).toHaveBeenCalledWith({
        include: [
          {
            model: UserTeam,
            attributes: ["team_name", "created_at"],
          },
        ],
      });

      // Assert that the result is null
      expect(result).toBeNull();
    });
  });
  describe("getUserByUsernameService", () => {
    it("should return user if found", async () => {
      const mockUser = {
        username: "testuser",
        password: "password123",
        role_name: "user",
      };

      (User.findOne as jest.MockedFunction<any>).mockResolvedValueOnce(
        mockUser,
      );

      const user = await getUserByUsernameService("testuser");

      expect(user).toEqual(mockUser);
      expect(User.findOne).toHaveBeenCalledWith({
        where: {
          username: { [Op.endsWith]: "testuser" },
        },
      });
    });

    it("should return null if user not found", async () => {
      (User.findOne as jest.MockedFunction<any>).mockResolvedValueOnce(null);

      const user = await getUserByUsernameService("nonexistentuser");

      expect(user).toBeNull();
    });
  });

  describe("createUserService", () => {
    it("should create and return a user", async () => {
      const mockUser = {
        username: "testuser",
        password: "password123",
        role_name: "user",
      };
      (User.create as jest.MockedFunction<any>).mockResolvedValueOnce(mockUser);

      const user = await createUserService("testuser", "password123", "user");

      expect(user).toEqual(mockUser);
      expect(User.create).toHaveBeenCalledWith({
        username: "testuser",
        password: "password123",
        role_name: "user",
      });
    });

    it("should return null if user creation fails", async () => {
      (User.create as jest.MockedFunction<any>).mockResolvedValueOnce(null);
      const user = await createUserService("testuser", "password123", "user");

      expect(user).toBeNull();
    });
  });
});
