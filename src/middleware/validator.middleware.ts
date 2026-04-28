import { AppError } from "../utils/app.error.js";
import type { Request, Response, NextFunction } from "express";

export const validator = (
  req: Request<{}, {}, { url: string }>,
  _res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.body.url) throw new AppError(400, "URL not provided");
    next();
  } catch (err) {
    next(err);
  }
};
