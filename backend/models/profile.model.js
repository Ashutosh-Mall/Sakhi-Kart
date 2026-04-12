import {model, Schema} from "mongoose";

const profileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
  {timestamps: true},
);

const Profile = model("Profile", profileSchema);
export default Profile;
