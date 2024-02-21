import { getStaffMappingByStaffIdController } from "../controllers/user-team.controller";
import express from "express";
import { validateSchema } from "../middleware/validateSchema";
import { UserTeamDTO } from "../dto/user-team.dto";

const router = express.Router();

router.get(
  "/mapping",
  validateSchema(UserTeamDTO),
  getStaffMappingByStaffIdController,
);

export default router;
