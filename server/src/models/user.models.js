import mongoose from "mongoose";


let userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    clerkid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    imageurl: {
      type: String,
    },
    occupation: {
      type: String,
      trim: true,
    },
    organizationname: {
      type: String,
      trim: true,
    },
    plantype: {
      type: String,
      enum: ["free", "premium", "enterprise"],
      default: "free",
    },
    intendedusecase: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);


export const User = mongoose.model("User", userSchema);
