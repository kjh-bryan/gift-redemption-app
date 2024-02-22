import { getAllRolesController } from "../../../src/controllers/role.controller";
import { getAllRolesService } from "../../../src/services/role.service";
import { mockedData } from "../../helpers/mock-data";

jest.mock("../../../src/services/role.service", () => {
  return {
    getAllRolesService: jest.fn(),
  };
});

describe("Role Controller", () => {
  describe("getAllRolesController", () => {
    beforeAll(() => {
      jest.spyOn(console, "error").mockImplementation(() => {});
    });
    afterAll(() => {
      (console.error as jest.MockedFunction<any>).mockRestore();
    });

    afterEach(() => {
      (console.error as jest.MockedFunction<any>).mockClear();
    });

    it("should return 200 OK and roles", async () => {
      const mockedRoles = mockedData.roles;
      const req: any = {};
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getAllRolesService as jest.MockedFunction<any>).mockResolvedValue(
        mockedRoles,
      );

      await getAllRolesController(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Success",
        data: mockedRoles,
      });
    });

    it("should return 404 NOT FOUND if no roles return", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getAllRolesService as jest.MockedFunction<any>).mockResolvedValue(null);

      await getAllRolesController(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Roles Not Found",
      });
    });
    it("should return 500 Internal Server Error if an error occurs", async () => {
      const req: any = {};
      const res: any = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      (getAllRolesService as jest.MockedFunction<any>).mockRejectedValue(
        new Error("Error"),
      );

      await getAllRolesController(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    });
  });
});
