import express, { Request, Response, NextFunction } from "express";
import { z, AnyZodObject } from "zod";

export const validateSchema =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      let err = error;
      if (err instanceof z.ZodError) {
        err = err.issues.map((e) => ({ path: e.path[1], message: e.message }));
        return res.status(409).json({
          message: "Failed",
          error: err,
        });
      } else if (error instanceof Error) {
        const err = error as Error & { statusCode?: number };
        res.status(err.statusCode ?? 400).json({
          message: err.message,
        });
        return;
      }
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };
