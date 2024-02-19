import express, { Express } from "express";
import cors from "cors";
import redemptionRoutes from "./routes/redemption-routes";

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use("/api/redemption", redemptionRoutes);

export default app;
