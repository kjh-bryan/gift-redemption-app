import { Request, Response } from "express";
import {
  createUserService,
  getUserByUsernameService,
} from "../services/user.service";
import {
  createUserTeamService,
  getUserTeamByStaffIdService,
} from "../services/user-team.service";
import bcrypt from "bcryptjs";
import config from "../config/default";
import jwt from "jsonwebtoken";

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
      team_name: userTeam?.team_name,
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

    console.log("req.body :", req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUserService(username, hashedPassword, role_name);
    console.log("user : ", user);
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

    console.log("req.body :", req.body);
    console.log("[loginController]");
    console.log("[loginController] [req.body] ", req.body);
    const user = await getUserByUsernameService(username);
    console.log("[loginController] [user] ", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log(
      "[loginController] [password] ",
      await bcrypt.hash(password, 10),
    );
    const isMatch = await bcrypt.compare(password, user.password);

    console.log("[loginController] [isMatch] ", isMatch);
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
