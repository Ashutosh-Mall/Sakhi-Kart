import fs from "fs";
import uploadOnCloudinary from "../config/uploadToCloudinary.js";
import { generatePremiumProductImage } from "../config/productAi.js";
import { generateProductDetailsFromImage } from "../config/product.dis.js";
import Product from "../models/produce.model.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const { price, stock } = req.body;
    const parsedStock = Number(stock) || 1;

    const localFilePath = req.file.path;

    // ☁️ STEP 1: Upload original image
    const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

    if (!cloudinaryResponse) {
      return res.status(500).json({
        message: "Cloudinary upload failed",
      });
    }

    // 🧹 delete local file
    fs.unlinkSync(localFilePath);

    const originalImageUrl = cloudinaryResponse.secure_url;

    // 🎨 STEP 2: Generate Premium Image
    const aiImageRes = await generatePremiumProductImage({
      imageUrl: originalImageUrl,
    });

    const finalImageUrl = aiImageRes.imageUrl;

    if (!finalImageUrl) {
      return res.status(500).json({
        message: "AI image generation failed",
      });
    }

    // 🧠 STEP 3: Generate Title + Description
    const productDetails = await generateProductDetailsFromImage({
      imageUrl: finalImageUrl,
    });

    // 📦 FINAL RESPONSE
    return res.status(200).json({
      message: "Upload successful",
      data: {
        originalImage: originalImageUrl,
        enhancedImage: finalImageUrl,
        prompt: aiImageRes.prompt,
        title: productDetails.title,
        description: productDetails.description,
        price: price,
        stock: parsedStock, 
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Upload failed",
    });
  }
};



export const createProduct = async (req, res) => {
  try {
    const { title, description, price, image, location, stock } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({
        message: "Title, description and price are required",
      });
    }

     const { userId } = req.user;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const product = await Product.create({
      user: userId,
      title,
      description,
      price: Number(price), // 💰 safe conversion
      image,
      location,
      stock: stock || 1,
    });

    return res.status(201).json({
      message: "Product listed successfully 🚀",
      product,
    });

  } catch (err) {
    console.error("❌ Create Product Error:", err.message);

    return res.status(500).json({
      message: "Failed to create product",
    });
  }
};



// 📦 Get All Products (No conditions)
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "All products fetched successfully",
      count: products.length,
      products,
    });

  } catch (err) {
    console.error("❌ Get Products Error:", err.message);

    return res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};