import cors from "cors";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import envConfig, { PORT, SESSION_SECRET } from "./config/env.js";
import { NODE_ENV } from "./schemas/env.js";
import { mountRoutes } from "./routes/index.js";
import { globalErrorHandler } from "./middlewares/errorHandler.js";
import type { TErrorResponse, TSuccessResponse } from "./types/index.js";
import session from "express-session";
import pgSession from "connect-pg-simple";
import pool from "./config/db.js";

const PostgresStore = pgSession(session);

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(
  session({
    store: new PostgresStore({
      pool: pool,
      createTableIfMissing: true,
      tableName: "user_session",
    }),
    name: "aurora_sid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: "/",
      httpOnly: true,
      secure: envConfig.NODE_ENV === NODE_ENV.PRODUCTION,
    },
  }),
);

const startServer = () => {
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

export default app;
