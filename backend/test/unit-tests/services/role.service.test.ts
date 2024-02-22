import { Role } from "../../../src/models";
import { getAllRolesService } from "../../../src/services/role.service";

jest.mock("../../../src/models", () => ({
  Role: {
    findAll: jest.fn(),
  },
}));

describe("Role Service", () => {
  describe("getAllRolesService", () => {
    it("should return all roles", async () => {
      const mockRoles = [{ role_name: "RoleA" }, { role_name: "RoleB" }];
      (Role.findAll as jest.MockedFunction<any>).mockResolvedValueOnce(
        mockRoles,
      );

      const roles = await getAllRolesService();

      expect(roles).toEqual(mockRoles);
      expect(Role.findAll).toHaveBeenCalledWith({ where: {} });
    });

    it("should return null if no roles found", async () => {
      (Role.findAll as jest.MockedFunction<any>).mockResolvedValueOnce(null);

      const roles = await getAllRolesService();

      expect(roles).toBeNull();
    });
  });
});
