import express, { Request, Response, NextFunction } from "express";
import supertest from "supertest";
import { z, AnyZodObject } from "zod";

// Import your middleware
import { validateSchema } from "../../../src/middleware/validateSchema";
import { BaseError } from "sequelize";

const schema = z.object({
  body: z.object({
    user_name: z.string({
      required_error: "User name is required",
    }),
  }),
});

describe("validateSchema middleware", () => {
  // Mock Request, Response, and NextFunction
  let req: Partial<Request>;
  let res: Partial<Response>;
  const nextFunction = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    req = {
      body: {},
      query: {},
      params: {},
    };
    res = {
      status: jest.fn(),
      json: jest.fn(),
    };
  });

  it("should call next() if schema validation passes", async () => {
    const mockSchema = { parseAsync: jest.fn().mockResolvedValue(undefined) };
    await validateSchema(mockSchema as any)(
      req as Request,
      res as Response,
      nextFunction,
    );
    expect(mockSchema.parseAsync).toHaveBeenCalledWith({
      body: {},
      query: {},
      params: {},
    });
    expect(nextFunction).toHaveBeenCalled();
  });

  it("should return 409 status with ZodError issues if schema validation fails", async () => {
    const req: any = { body: { staff_pass_id: "incorrect_id" } };
    const res: any = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    const next = jest.fn();
    await validateSchema(schema)(req as Request, res as Response, nextFunction);
    expect(res?.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      message: "Failed",
      error: [{ path: "user_name", message: "User name is required" }],
    });
  });

  it("should return 400 status with error message if an Error occurs", async () => {
    const errorMessage = "Something went wrong";
    const error = new Error(errorMessage);
    const mockSchema = { parseAsync: jest.fn().mockRejectedValue(error) };

    const req: any = { body: { staff_pass_id: "incorrect_id" } };
    const res: any = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    await validateSchema(mockSchema as any)(
      req as Request,
      res as Response,
      nextFunction,
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });

  it("should return 500 status with generic message if an unexpected error occurs", async () => {
    const unexpectedError = BaseError;
    const mockSchema = {
      parseAsync: jest.fn().mockRejectedValue(unexpectedError),
    };
    const req: any = { body: { staff_pass_id: "incorrect_id" } };
    const res: any = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    await validateSchema(mockSchema as any)(
      req as Request,
      res as Response,
      nextFunction,
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
  });
});
