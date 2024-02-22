import { Request, Response } from "express";
import {
  createUserService,
  getAllUserService,
  getUserByUsernameService,
} from "../services/user.service";
import {
  createUserTeamService,
  getUserTeamByStaffIdService,
} from "../services/user-team.service";
import bcrypt from "bcryptjs";
import config from "../config/default";
import jwt from "jsonwebtoken";

export const getAllUserController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUserService();
    if (!users) {
      return res.status(401).json({ message: "Users Not Found" });
    }

    const flattenedUsers = users.map((user: any) => {
      const { username, password, role_name, UserTeams } = user;

      const { team_name, created_at } = UserTeams[0]; // Assuming each user has only one team
      return {
        username,
        role_name,
        team_name: team_name ?? "UNASSIGNED",
        created_at,
      };
    });
    // console.log(flattenedUsers);
    return res.status(200).json({
      message: "Success",
      data: flattenedUsers,
    });
  } catch (error) {
    console.error("Error fetching users detail: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserByUsernameController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { username } = req.params;
    const user = await getUserByUsernameService(username);
    if (!user) {
      return res.status(201).json({ message: "User Not Found" });
    }

    if (user.role_name === "ADMIN") {
      const adminResponseData = {
        username: user.username,
        password: user.password,
        role_name: user.role_name,
        team_name: "Administrator",
      };
      return res.status(200).json({
        message: "Success",
        data: adminResponseData,
      });
    }

    const userTeam = await getUserTeamByStaffIdService(user.username);

    if (!userTeam) {
      return res.status(201).json({ message: "User Not Found" });
    }
    const responseData = {
      username: user.username,
      password: user.password,
      role_name: user.role_name,
      team_name: userTeam.team_name,
    };
    return res.status(200).json({
      message: "Success",
      data: responseData,
    });
  } catch (error) {
    console.error("Error fetching user detail: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { username, password, role_name, team_name } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUserService(username, hashedPassword, role_name);
    if (!user) {
      return res.status(401).json({ message: "Unable to create User" });
    }

    const userTeam = await createUserTeamService(username, team_name);
    console.log("userTeam : ", userTeam);
    if (!userTeam) {
      return res.status(402).json({ message: "Unable to create User Team" });
    }

    const responseData = {
      username: user.username,
      role_name: user.role_name,
      team_name: team_name,
    };

    return res.status(200).json({
      message: "Success",
      data: responseData,
    });
  } catch (error) {
    console.error("Error creating user: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await getUserByUsernameService(username);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        username: user.username,
      },
      config.JWT_SECRET,
      { expiresIn: "1h" },
    );

    const responseData = {
      username: user.username,
      role_name: user.role_name,
      token: token,
    };
    return res.status(200).json({
      message: "Success",
      data: responseData,
    });
  } catch (error) {
    console.error("Error logging in: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
