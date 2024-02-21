import { Op } from "sequelize";
import { User } from "../models";

export const getUserByUsernameService = async (
  username: string,
): Promise<User | null> => {
  const user = await User.findOne({
    where: {
      username: {
        [Op.endsWith]: username,
      },
    },
  });

  if (user) return user;
  return null;
};

export const createUserService = async (
  username: string,
  password: string,
  role_name: string,
): Promise<User | null> => {
  const user = await User.create({
    username,
    password,
    role_name,
  });
  if (user) return user;
  return null;
};
