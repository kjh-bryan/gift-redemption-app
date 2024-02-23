import express from "express";
import {
  createTeamController,
  getAllTeamNamesController,
} from "../controllers/team.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get("/", getAllTeamNamesController);
router.post("/", verifyToken, createTeamController);

export default router;
