import express from "express";
import { getAllTeamNamesController } from "../controllers/team.controller";

const router = express.Router();

router.get("/", getAllTeamNamesController);

export default router;
