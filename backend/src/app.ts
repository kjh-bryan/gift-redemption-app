import express, { Express } from "express";
import cors from "cors";
import giftRoutes from "./routes/gift.routes";
import teamRoutes from "./routes/team.routes";
import userTeamRoutes from "./routes/user-team.routes";
import userRoutes from "./routes/user.routes";
import roleRoutes from "./routes/role.routes";
import { verifyToken } from "./middleware/verifyToken";

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/gifts", verifyToken, giftRoutes);
app.use("/api/v1/teams", teamRoutes);
app.use("/api/v1/user-team", userTeamRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/roles", roleRoutes);

export default app;
