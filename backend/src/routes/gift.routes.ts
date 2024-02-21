import express from "express";
import {
  redeemGiftController,
  verifyRedemptionController,
} from "../controllers/redemption.controller";
import { getAllGiftsController } from "../controllers/gift.controller";
import { validateSchema } from "../middleware/validateSchema";
import { RedemptionDTO } from "../dto/redemption.dto";

const router = express.Router();

router.get("/", getAllGiftsController);

router.get(
  "/verify-team",
  validateSchema(RedemptionDTO),
  verifyRedemptionController,
);

router.post("/redeem", validateSchema(RedemptionDTO), redeemGiftController);

export default router;
