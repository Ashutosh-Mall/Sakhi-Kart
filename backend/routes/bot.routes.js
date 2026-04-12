import express from 'express';
import { replyToChat } from '../controllers/bot.controller.js';
import { isAuth } from '../middleware/isAuth.js';

const route = express.Router();
route.post("/chat", isAuth, replyToChat);

export default route;