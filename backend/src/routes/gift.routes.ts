import express from "express";
import {
  redeemGiftController,
  verifyRedemptionController,
} from "../controllers/redemption.controller";
import {
  createGiftController,
  getAllGiftsController,
} from "../controllers/gift.controller";
import { validateSchema } from "../middleware/validateSchema";
import { RedemptionDTO, VerifyRedemptionDTO } from "../dto/redemption.dto";
import { CreateGiftDTO } from "../dto/gift.dto";

const router = express.Router();

router.get("/", getAllGiftsController);

router.post("/", validateSchema(CreateGiftDTO), createGiftController);

router.get(
  "/verify-team",
  validateSchema(VerifyRedemptionDTO),
  verifyRedemptionController,
);

router.post("/redeem", validateSchema(RedemptionDTO), redeemGiftController);

export default router;
