import cors from "cors";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import envConfig, { PORT } from "./config/env.js";
import { NODE_ENV } from "./schemas/env.js";
import { mountRoutes } from "./routes/index.js";
import { globalErrorHandler } from "./middlewares/errorHandler.js";
import type { TErrorResponse, TSuccessResponse } from "./types/index.js";

const app: Application = express();

app.use(cors());
app.use(express.json());

const startServer = async () => {
  try {
    mountRoutes(app);

    app.get("/", (_req: Request, res: Response<TSuccessResponse>) => {
      res.send({
        success: true,
        message: "Welcome to Aurora Mart API!",
      });
    });

    app.use((_req: Request, res: Response<TErrorResponse>) => {
      res.status(404).send({
        success: false,
        message: "Route not found!",
      });
    });

    app.use(globalErrorHandler);

    if (envConfig.NODE_ENV === NODE_ENV.DEVELOPMENT) {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    }
  } catch (error: unknown) {
    console.error("Failed to start server:", (error as Error).message);

    if (envConfig.NODE_ENV === NODE_ENV.DEVELOPMENT) {
      process.exit(1);
    }
  }
};

startServer();
