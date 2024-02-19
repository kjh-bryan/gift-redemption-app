import express, { Express } from "express";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

export default app;
