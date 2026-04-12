import Profile from "../models/profile.model.js";
import uploadOnCloudinary from "../config/uploadToCloudinary.js";
import User from "../models/user.model.js";
import Vendor from "../models/vendor.model.js";

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.user;

    const { fullName, phone, address, bio } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let profilePicUrl;
    if (req.file) {
      const uploadResult = await uploadOnCloudinary(req.file.path);
      profilePicUrl = uploadResult?.secure_url;
    }

    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    profile.fullName = fullName || profile.fullName;
    profile.phone = phone || profile.phone;
    profile.address = address || profile.address;
    profile.bio = bio || profile.bio;

    if (profilePicUrl) {
      profile.profilePic = profilePicUrl;
    }

    await profile.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


export const getProfile = async (req, res) => {
  try {
    const { userId } = req.user;

    const profile = await Profile.findOne({ user: userId }).populate("user", "username email");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      profile,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const upgradeToVendor = async (req, res) => {
  try {
    const { userId } = req.user;
    const { shopName, businessType, gstNumber } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const existingVendor = await Vendor.findOne({ profile: profile._id });
    if (existingVendor) {
      return res.status(400).json({
        success: false,
        message: "Already a vendor",
      });
    }

    const vendor = await Vendor.create({
      profile: profile._id,
      shopName,
      businessType,
      gstNumber,
    });

    user.role = "vendor";
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Successfully upgraded to vendor",
      vendor,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const updateVendor = async (req, res) => {
  try {
    const { userId } = req.user;
    const { shopName, businessType, gstNumber } = req.body;

    const profile = await Profile.findOne({ user: userId });
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const vendor = await Vendor.findOne({ profile: profile._id });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    vendor.shopName = shopName || vendor.shopName;
    vendor.businessType = businessType || vendor.businessType;
    vendor.gstNumber = gstNumber || vendor.gstNumber;

    await vendor.save();

    return res.status(200).json({
      success: true,
      message: "Vendor updated successfully",
      vendor,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};