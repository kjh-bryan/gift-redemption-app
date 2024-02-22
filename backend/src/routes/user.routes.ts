import express from "express";
import {
  createUserController,
  getAllUserController,
  getUserByUsernameController,
  loginController,
} from "../controllers/user.controller";
import { validateSchema } from "../middleware/validateSchema";
import { LoginUserDTO, RegisterUserDTO, UsernameDTO } from "../dto/user.dto";

const router = express.Router();

router.post("/register", validateSchema(RegisterUserDTO), createUserController);
router.post("/login", validateSchema(LoginUserDTO), loginController);
router.get("/", getAllUserController);
router.get(
  "/:username",
  validateSchema(UsernameDTO),
  getUserByUsernameController,
);

export default router;
