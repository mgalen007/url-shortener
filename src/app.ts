import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { errorHandler } from "./middleware/error.middleware.js";
import urlRouter from "./url/url.router.js";

// Instantiate app
const app = express();

// Attach middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Health check enpoint
app.get("/health", (_req, res) => {
  res.json({
    status: "OK",
    name: "URL Shortener API",
    message: "Server up and running",
  });
});

// Mount URL router
app.use("/url", urlRouter);

// Error-handling middleware
app.use(errorHandler);

export default app;
