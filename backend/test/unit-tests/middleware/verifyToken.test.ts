import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../../../src/config/default";
import {
  verifyToken,
  CustomRequest,
} from "../../../src/middleware/verifyToken";

const mockRequest = () => {
  const req: Partial<Request> = {};
  req.header = jest.fn();
  return req as Request;
};

const mockResponse = () => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  return res as Response;
};

const mockNext = jest.fn() as NextFunction;

// Mock JWT token
const mockToken = "mockToken";

// Mock decoded JWT payload
const mockDecodedToken = { userId: "123" };

// Mock JWT verify function
jest.mock("jsonwebtoken", () => ({
  verify: jest.fn().mockReturnValue({ userId: "123" }),
}));

describe("verifyToken middleware", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if authorization header is missing", async () => {
    const req = mockRequest();
    const res = mockResponse();

    await verifyToken(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Authorization header is missing",
      data: {},
    });
  });

  it("should return 402 if token is missing", async () => {
    const req = mockRequest();
    req.header = jest.fn().mockReturnValue("Bearer ");

    const res = mockResponse();

    await verifyToken(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(402);
    expect(res.json).toHaveBeenCalledWith({
      message: "Unauthorized",
      error: "Access denied",
    });
  });
  it("should set decoded token in req.token and call next() if token is valid", async () => {
    const req = mockRequest();
    req.header = jest.fn().mockReturnValue(`Bearer ${mockToken}`);

    const res = mockResponse();

    await verifyToken(req, res, mockNext);

    expect(jwt.verify).toHaveBeenCalledWith(mockToken, config.JWT_SECRET);
    expect((req as CustomRequest).token).toEqual(mockDecodedToken);
    expect(mockNext).toHaveBeenCalled();
  });
  it("should return 401 if token is invalid", async () => {
    const req = mockRequest();
    req.header = jest.fn().mockReturnValue(`Bearer Invalid`);

    const res = mockResponse();
    jwt.verify = jest.fn().mockImplementation(() => {
      throw new Error("Invalid token");
    });
    await verifyToken(req, res, mockNext);

    expect(res.json).toHaveBeenCalledWith({
      message: "Unauthorized",
      error: "Invalid token",
    });
  });
});
