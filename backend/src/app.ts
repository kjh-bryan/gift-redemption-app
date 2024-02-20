import express, { Express } from "express";
import cors from "cors";
import giftRoutes from "./routes/gift.routes";
import teamRoutes from "./routes/team.routes";
import userTeamRoutes from "./routes/user-team.routes";

const app: Express = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/gifts", giftRoutes);
app.use("/api/v1/teams", teamRoutes);
app.use("/api/v1/staff-team", userTeamRoutes);

export default app;
