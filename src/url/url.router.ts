import { Router } from "express";
import { UrlsController } from "./url.controller.js";
import { validator } from "../middleware/validator.middleware.js";

// Instantiate router and controller
const router = Router();
const urlsController = new UrlsController();

// Endpoints
router.post("/shorten", validator, urlsController.shorten);
router.get("/stats/:code", urlsController.stats);
router.get("/:code", urlsController.redirect);

export default router;
