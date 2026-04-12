import express from "express";
import { chatWithAI } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/voice", chatWithAI);

export default router;