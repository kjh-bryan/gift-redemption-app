import { Op } from "sequelize";
import { User, UserTeam } from "../models";

export const getAllUserService = async (): Promise<any> => {
  const user = await User.findAll({
    include: [
      {
        model: UserTeam,
        attributes: ["team_name", "created_at"],
      },
    ],
  });

  if (user) return user;
  return null;
};

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
