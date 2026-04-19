import cors from "cors";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";

const app: Application = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use(cors());

app.get("/", (_req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Welcome to Aurora Mart API!",
  });
});

app.use((_req: Request, res: Response) => {
  res.status(404).send({
    success: false,
    message: "Route not found!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
