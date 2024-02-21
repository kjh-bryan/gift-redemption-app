import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/default";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization =
    req.header("authorization") || req.header("Authorization");
  if (!authorization) {
    return res.status(401).json({
      message: "Authorization header is missing",
      data: {},
    });
  }
  const token = authorization.replace("Bearer ", "");

  if (!token) {
    return res
      .status(402)
      .json({ message: "Unauthorized", error: "Access denied" });
  }

  try {
    const decoded: any = jwt.verify(token, config.JWT_SECRET);

    (req as CustomRequest).token = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: "Invalid token" });
  }
};
