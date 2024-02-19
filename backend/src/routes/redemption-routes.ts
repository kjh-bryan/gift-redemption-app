import express from "express";
import {
  getGifts,
  getStaffMappingByStaffId,
  redeemGift,
  verifyRedemption,
} from "../controllers/redemption-controller";

const router = express.Router();

router.get("/staff-id-to-team", getStaffMappingByStaffId);
router.get("/gifts", getGifts);
router.get("/verify", verifyRedemption);
router.post("/redeem", redeemGift);

export default router;
