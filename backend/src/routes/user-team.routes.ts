import { getStaffMappingByStaffIdController } from "../controllers/user-team.controller";
import express from "express";

const router = express.Router();

router.get("/mapping", getStaffMappingByStaffIdController);

export default router;
