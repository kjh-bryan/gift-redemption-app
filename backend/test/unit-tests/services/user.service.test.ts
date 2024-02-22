import { Op } from "sequelize";
import { User } from "../../../src/models";
import {
  createUserService,
  getUserByUsernameService,
} from "../../../src/services/user.service";

jest.mock("../../../src/models", () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

describe("User Service", () => {
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
