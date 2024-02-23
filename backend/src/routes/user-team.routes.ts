import {
  getStaffMappingByStaffIdController,
  updateTeamNameByStaffIdController,
} from "../controllers/user-team.controller";
import express from "express";
import { validateSchema } from "../middleware/validateSchema";
import { UpdateUserDTO, UserTeamDTO } from "../dto/user-team.dto";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get(
  "/mapping",
  validateSchema(UserTeamDTO),
  getStaffMappingByStaffIdController,
);

router.put(
  "/",
  verifyToken,
  validateSchema(UpdateUserDTO),
  updateTeamNameByStaffIdController,
);

export default router;
