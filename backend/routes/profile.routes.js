import express from "express";
import {
  getProfile,
  upgradeToVendor,
  updateProfile,
  updateVendor,
} from "../controllers/profile.controller.js";

import { isAuth } from "../middleware/isAuth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/get", isAuth, getProfile);
router.put("/update", isAuth, upload.single("profilePic"), updateProfile);
router.post("/upgrade-vendor", isAuth, upgradeToVendor);
router.put("/update-vendor", isAuth, updateVendor);

export default router;