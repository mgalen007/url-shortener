import type { NextFunction, Request, Response } from "express";
import { UrlsService } from "./url.service.js";
import { AppError } from "../utils/app.error.js"

export class UrlsController {
  private readonly urlsService = new UrlsService();

  shorten = (
    req: Request<{}, {}, { url: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const code = this.urlsService.shorten(req.body.url);
      if (!code) throw new AppError(400, "URL not provided")
      res.status(200).json({
        success: true,
        data: { code },
      });
    } catch (err) {
      next(err);
    }
  };

  stats = (
    req: Request<{ code: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const results = this.urlsService.stats(req.params.code);
      res.status(200).json({
        success: true,
        data: { results },
      });
    } catch (err) {
      next(err);
    }
  };

  redirect = (
    req: Request<{ code: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const entry = this.urlsService.increment(req.params.code);
      res.status(302).redirect(entry.original);
    } catch (err) {
      next(err);
    }
  };
}
