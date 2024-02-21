import express from "express";
import { getAllRolesController } from "../controllers/role.controller";

const router = express.Router();

router.get("/", getAllRolesController);

export default router;
