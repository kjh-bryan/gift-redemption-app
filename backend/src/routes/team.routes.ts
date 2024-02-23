import express from "express";
import {
  createTeamController,
  getAllTeamNamesController,
  updateTeamController,
} from "../controllers/team.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get("/", getAllTeamNamesController);
router.post("/", verifyToken, createTeamController);
router.put("/", verifyToken, updateTeamController);

export default router;
