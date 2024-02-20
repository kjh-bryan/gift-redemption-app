import express from "express";
import {
  redeemGiftController,
  verifyRedemptionController,
} from "../controllers/redemption.controller";
import { getAllGiftsController } from "../controllers/gift.controller";

const router = express.Router();

router.get("/", getAllGiftsController);

router.get("/verify-team", verifyRedemptionController);

router.post("/:id/redeem", redeemGiftController);

export default router;
