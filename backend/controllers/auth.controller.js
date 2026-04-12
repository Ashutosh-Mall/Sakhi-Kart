import bcrypt from 'bcrypt';
import TempUser from '../models/tempUser.model.js';
import User from '../models/user.model.js';
import { sendMail } from '../config/email.js';
import { generateOtpEmail } from '../utils/mail.js';
import { generateToken } from '../utils/generateToken.js';
import { generateOtp } from '../utils/genrateOtp.js';
import Profile from '../models/profile.model.js';

export const sendOtp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();

    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    await TempUser.findOneAndUpdate(
      { email },
      {
        username,
        email,  
        password: hashedPassword,
        otp,
        otpExpires,
      },
      { upsert: true, new: true }
    );
    const html = generateOtpEmail(otp, username);
    await sendMail(email, html);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const tempUser = await TempUser.findOne({ email });

    if (!tempUser) {
      return res.status(400).json({
        message: "No signup request found. Please request OTP again.",
      });
    }

    if (tempUser.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    if (tempUser.otpExpires < Date.now()) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      username: tempUser.username,
      email: tempUser.email,
      password: tempUser.password,
      isVerified: true,
    });


    await TempUser.deleteOne({ email });

    const profile = await Profile.create({
      user:user._id,
    });


    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: false, 
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
};