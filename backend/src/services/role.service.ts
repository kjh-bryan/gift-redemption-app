import { Role } from "../models";

export const getAllRolesService = async (): Promise<Role[] | null> => {
  const roles = await Role.findAll({
    where: {},
  });

  if (roles) return roles;
  return null;
};
