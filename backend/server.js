import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from "cors";
import authRouter from './routes/auth.routes.js'
import profileRouter from './routes/profile.routes.js'
import botRouter from './routes/bot.routes.js'
import uploadRoutes from "./routes/upload.routes.js";
import chatRouter from "./routes/chat.routes.js";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/bot', botRouter);
app.use("/api", uploadRoutes);
app.use("/api", chatRouter);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("DB Connection Failed:", err.message);
  }
};

startServer();
