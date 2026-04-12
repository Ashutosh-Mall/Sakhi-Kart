import express from "express";
import upload from "../middleware/upload.js";
import { uploadImage, createProduct , getAllProducts } from "../controllers/upload.controller.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage);
router.post("/product/save", isAuth, upload.single("image"), createProduct);
router.get("/products", getAllProducts);

export default router;