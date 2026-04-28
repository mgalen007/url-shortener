import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { errorHandler } from "./middleware/error.middleware.js";
import urlRouter from "./url/url.router.js";
import { swaggerDocument } from "./docs/swagger.js";

// Instantiate app
const app = express();

// Attach middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/docs.json", (_req, res) => {
  res.json(swaggerDocument);
});

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
