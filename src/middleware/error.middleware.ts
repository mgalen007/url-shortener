import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app.error.js";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError && err.code != 500) {
    res.status(err.code).json({
      success: false,
      message: err.message,
    });
    next();
  }
  console.error(`Unhandled error: ${err}`);
  res.status(500).json({
    success: false,
    message: "An error occured, try again later",
  });
};
