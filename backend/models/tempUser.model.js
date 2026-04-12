import {model, Schema} from "mongoose";

const tempUserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    otpExpires: {
      type: Date,
      required: true,
    },
  },
  {timestamps: true},
);
tempUserSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });
const TempUser = model("TempUser", tempUserSchema);
export default TempUser;
