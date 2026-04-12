import express from "express";
const route = express.Router();

import {
  signup,
  sendOtp,
  login,
  logout,
} from "../controllers/auth.controller.js";

// routes
route.post("/send-otp", sendOtp);
route.post("/signup", signup);
route.post("/login", login);
route.get("/logout", logout);

export default route;