import express from "express";
import {
  createUserController,
  deleteUserController,
  getAllUserController,
  getUserByUsernameController,
  loginController,
} from "../controllers/user.controller";
import { validateSchema } from "../middleware/validateSchema";
import { LoginUserDTO, RegisterUserDTO, UsernameDTO } from "../dto/user.dto";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.post("/register", validateSchema(RegisterUserDTO), createUserController);
router.post("/login", validateSchema(LoginUserDTO), loginController);

router.get(
  "/:username",
  validateSchema(UsernameDTO),
  getUserByUsernameController,
);
router.delete("/:username", verifyToken, deleteUserController);
router.get("/", getAllUserController);

export default router;
