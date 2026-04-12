import {model, Schema} from "mongoose";

const vendorSchema = new Schema(
  {
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
      unique: true,
    },
    shopName: {
      type: String,
      required: true,
    },
    businessType: {
      type: String,
    },
    gstNumber: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  {timestamps: true},
);

const Vendor = model("Vendor", vendorSchema);
export default Vendor;
