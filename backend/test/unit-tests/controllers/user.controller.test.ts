import {
  createUserController,
  deleteUserController,
  getAllUserController,
  getUserByUsernameController,
  loginController,
} from "../../../src/controllers/user.controller";
import {
  createUserTeamService,
  getUserTeamByStaffIdService,
} from "../../../src/services/user-team.service";
import {
  createUserService,
  deleteUserService,
  getAllUserService,
  getUserByUsernameService,
} from "../../../src/services/user.service";
import { mockedData } from "../../helpers/mock-data";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

jest.mock("bcryptjs", () => ({
  compare: jest.fn().mockResolvedValue(true),
  hash: jest.fn().mockResolvedValue("mocked_hash"),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn().mockReturnValue("dummy_token"),
}));

jest.mock("../../../src/services/user.service", () => {
  return {
    getUserByUsernameService: jest.fn(),
    createUserService: jest.fn(),
    getAllUserService: jest.fn(),
    deleteUserService: jest.fn(),
  };
});

jest.mock("../../../src/services/user-team.service", () => {
  return {
    getUserTeamByStaffIdService: jest.fn(),
    createUserTeamService: jest.fn(),
  };
});

describe("User Controller", () => {
  describe("getAllUserController", () => {
    beforeAll(() => {
      jest.spyOn(console, "error").mockImplementation(() => {});
    });
    afterAll(() => {
      (console.error as jest.MockedFunction<any>).mockRestore();
    });

    afterEach(() => {
      (console.error as jest.MockedFunction<any>).mockClear();
    });

    it("should return 200 OK and users", async () => {
      const mockedUnflatteredUsers = mockedData.unflatteredUsers;
      const mockedFlatteredUsers = mockedData.flatteredUsers;
      const req: any = {};
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getAllUserService as jest.MockedFunction<any>).mockResolvedValue(
        mockedUnflatteredUsers,
      );

      await getAllUserController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Success",
        data: mockedFlatteredUsers,
      });
    });

    it("should return 401 NOT FOUND if no users return", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getAllUserService as jest.MockedFunction<any>).mockResolvedValue(null);
      await getAllUserController(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Users Not Found",
      });
    });
    it("should return 500 Internal Server Error if an error occurs", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getAllUserService as jest.MockedFunction<any>).mockRejectedValue(
        new Error("Error"),
      );

      await getAllUserController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });
  describe("getUserByUsernameController", () => {
    beforeAll(() => {
      jest.spyOn(console, "error").mockImplementation(() => {});
    });
    afterAll(() => {
      (console.error as jest.MockedFunction<any>).mockRestore();
    });

    afterEach(() => {
      (console.error as jest.MockedFunction<any>).mockClear();
    });

    it("should return 200 OK and user", async () => {
      const currentUser = mockedData.users[0];
      const teamMapping = mockedData.teamMapping as any;
      const mockedUserMapping = teamMapping[currentUser.username];
      const req: any = { params: { username: "STAFF" } };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getUserByUsernameService as jest.MockedFunction<any>).mockResolvedValue(
        currentUser,
      );

      (
        getUserTeamByStaffIdService as jest.MockedFunction<any>
      ).mockResolvedValue(mockedUserMapping);

      const responseData = {
        username: currentUser.username,
        password: currentUser.password,
        role_name: currentUser.role_name,
        team_name: mockedUserMapping.team_name,
      };
      await getUserByUsernameController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Success",
        data: responseData,
      });
    });

    it("should return 200 OK and admin user", async () => {
      const currentUser = mockedData.users[2];
      const teamMapping = mockedData.teamMapping as any;
      const mockedUserMapping = teamMapping[currentUser.username];
      const req: any = { params: { username: "ADMIN" } };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getUserByUsernameService as jest.MockedFunction<any>).mockResolvedValue(
        currentUser,
      );

      (
        getUserTeamByStaffIdService as jest.MockedFunction<any>
      ).mockResolvedValue(mockedUserMapping);

      const responseData = {
        username: currentUser.username,
        password: currentUser.password,
        role_name: currentUser.role_name,
        team_name: mockedUserMapping.team_name,
      };
      await getUserByUsernameController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Success",
        data: responseData,
      });
    });
    it("should return 201 OK and User Not found", async () => {
      const req: any = { params: { username: "STAFF" } };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getUserByUsernameService as jest.MockedFunction<any>).mockResolvedValue(
        null,
      );

      await getUserByUsernameController(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "User Not Found",
      });
    });

    it("should return 201 OK and User Team Not found", async () => {
      const currentUser = mockedData.users[0];
      const req: any = { params: { username: "STAFF" } };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getUserByUsernameService as jest.MockedFunction<any>).mockResolvedValue(
        currentUser,
      );
      (
        getUserTeamByStaffIdService as jest.MockedFunction<any>
      ).mockResolvedValue(null);
      await getUserByUsernameController(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "User Not Found",
      });
    });
    it("should return 500 Internal Server Error if an error occurs", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getUserByUsernameService as jest.MockedFunction<any>).mockRejectedValue(
        new Error("Error"),
      );

      await getUserByUsernameController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });

  describe("createUserController", () => {
    beforeAll(() => {
      jest.spyOn(console, "error").mockImplementation(() => {});
    });
    afterAll(() => {
      (console.error as jest.MockedFunction<any>).mockRestore();
    });

    afterEach(() => {
      (console.error as jest.MockedFunction<any>).mockClear();
    });

    it("should return 200 OK and created user", async () => {
      const currentUser = mockedData.users[0];
      const teamMapping = mockedData.teamMapping as any;
      const mockedUserMapping = teamMapping[currentUser.username];
      const mockedUserTeam = {
        staff_pass_id: currentUser.username,
        team_name: mockedUserMapping.team_name,
      };
      const req: any = {
        body: {
          username: "STAFF",
          password: "GRYFFINDOR",
          team_name: "GRYFFINDOR",
          role_name: "STAFF",
        },
      };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (createUserService as jest.MockedFunction<any>).mockResolvedValue(
        currentUser,
      );

      (createUserTeamService as jest.MockedFunction<any>).mockResolvedValue(
        mockedUserTeam,
      );

      const responseData = {
        username: currentUser.username,
        role_name: currentUser.role_name,
        team_name: mockedUserTeam.team_name,
      };
      await createUserController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Success",
        data: responseData,
      });
    });

    it("should return 402 NOT FOUND and Unable to create User Team", async () => {
      const currentUser = mockedData.users[0];
      const req: any = {
        body: {
          username: "STAFF",
          password: "GRYFFINDOR",
          team_name: "GRYFFINDOR",
          role_name: "STAFF",
        },
      };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (createUserService as jest.MockedFunction<any>).mockResolvedValue(
        currentUser,
      );

      (createUserTeamService as jest.MockedFunction<any>).mockResolvedValue(
        null,
      );
      await createUserController(req, res);

      expect(res.status).toHaveBeenCalledWith(402);
      expect(res.json).toHaveBeenCalledWith({
        message: "Unable to create User Team",
      });
    });

    it("should return 401 NOT FOUND and Unable to create User", async () => {
      const req: any = {
        body: {
          username: "STAFF",
          password: "GRYFFINDOR",
          team_name: "GRYFFINDOR",
          role_name: "STAFF",
        },
      };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (createUserService as jest.MockedFunction<any>).mockResolvedValue(null);

      await createUserController(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Unable to create User",
      });
    });
    it("should return 500 Internal Server Error if an error occurs", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (createUserService as jest.MockedFunction<any>).mockRejectedValue(
        new Error("Error"),
      );

      await createUserController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });

  describe("loginController", () => {
    beforeAll(() => {
      jest.spyOn(console, "error").mockImplementation(() => {});
    });
    afterAll(() => {
      (console.error as jest.MockedFunction<any>).mockRestore();
    });

    afterEach(() => {
      (console.error as jest.MockedFunction<any>).mockClear();
    });

    it("should return 200 OK and login credentials", async () => {
      const { role_name, ...currentUser } = mockedData.users[0];
      const teamMapping = mockedData.teamMapping as any;
      const mockedUserMapping = teamMapping[currentUser.username];
      const mockedUserTeam = {
        staff_pass_id: currentUser.username,
        team_name: mockedUserMapping.team_name,
      };
      const req: any = {
        body: currentUser,
      };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getUserByUsernameService as jest.MockedFunction<any>).mockResolvedValue({
        ...currentUser,
        role_name,
      });

      const responseData = {
        username: currentUser.username,
        role_name,
        token: "dummy_token",
      };
      await loginController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Success",
        data: responseData,
      });
    });

    it("should return 401 NOT FOUND and Invalid Credentials ( User doesn't exist )", async () => {
      const req: any = {
        body: {
          username: "INVALID_USER",
          password: "GRYFFINDOR",
          team_name: "GRYFFINDOR",
          role_name: "STAFF",
        },
      };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getUserByUsernameService as jest.MockedFunction<any>).mockResolvedValue(
        null,
      );

      await loginController(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid credentials",
      });
    });

    it("should return 401 NOT FOUND and Invalid Credentials ( Invalid Password )", async () => {
      const currentUser = mockedData.users[0];
      const req: any = {
        body: {
          username: "STAFF",
          password: "INVALID_PASSWORD",
          team_name: "GRYFFINDOR",
          role_name: "STAFF",
        },
      };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getUserByUsernameService as jest.MockedFunction<any>).mockResolvedValue(
        currentUser,
      );

      (bcrypt.compare as jest.MockedFunction<any>).mockResolvedValue(false);

      await loginController(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid credentials",
      });
    });
    it("should return 500 Internal Server Error if an error occurs", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getUserByUsernameService as jest.MockedFunction<any>).mockRejectedValue(
        new Error("Error"),
      );

      await loginController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });

  describe("deleteUserController", () => {
    beforeAll(() => {
      jest.spyOn(console, "error").mockImplementation(() => {});
    });
    afterAll(() => {
      (console.error as jest.MockedFunction<any>).mockRestore();
    });

    afterEach(() => {
      (console.error as jest.MockedFunction<any>).mockClear();
    });

    it("should return 200 and delete the user", async () => {
      const currentUser = mockedData.users[0];

      const req: any = { params: { username: currentUser.username } };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getUserByUsernameService as jest.MockedFunction<any>).mockResolvedValue(
        currentUser,
      );

      (deleteUserService as jest.MockedFunction<any>).mockResolvedValue(
        currentUser,
      );

      await deleteUserController(req, res);

      expect(getUserByUsernameService).toHaveBeenCalledWith(
        currentUser.username,
      );
      expect(deleteUserService).toHaveBeenCalledWith(currentUser.username);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Success",
        data: currentUser,
      });
    });

    it("should return 401 if user not found", async () => {
      const req: any = { params: { username: "NONEXISTENTUSER" } };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getUserByUsernameService as jest.MockedFunction<any>).mockResolvedValue(
        null,
      );

      await deleteUserController(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: "User Not Found" });
    });
    it("should return 401 if unable to delete user", async () => {
      const currentUser = mockedData.users[1];
      const req: any = { params: { username: currentUser.username } };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getUserByUsernameService as jest.MockedFunction<any>).mockResolvedValue(
        currentUser,
      );
      (deleteUserService as jest.MockedFunction<any>).mockResolvedValue(null);

      await deleteUserController(req, res);

      expect(getUserByUsernameService).toHaveBeenCalledWith(
        currentUser.username,
      );
      expect(deleteUserService).toHaveBeenCalledWith(currentUser.username);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Unable to delete User",
      });
    });

    it("should return 500 if an error occurs", async () => {
      const currentUser = mockedData.users[0];
      const req: any = { params: { username: currentUser.username } };
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getUserByUsernameService as jest.MockedFunction<any>).mockRejectedValue(
        new Error("Internal Server Error"),
      );

      await deleteUserController(req, res);
      expect(getUserByUsernameService).toHaveBeenCalledWith(
        currentUser.username,
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });
});
