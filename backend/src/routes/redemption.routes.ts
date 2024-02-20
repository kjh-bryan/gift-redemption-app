import express from "express";
import {
  getGiftsController,
  getStaffMappingByStaffIdController,
  redeemGiftController,
  verifyRedemptionController,
} from "../controllers/redemption.controller";

const router = express.Router();

router.get("/staff-id-to-team", getStaffMappingByStaffIdController);
router.get("/gifts", getGiftsController);
router.get("/verify", verifyRedemptionController);
router.post("/redeem", redeemGiftController);

export default router;
