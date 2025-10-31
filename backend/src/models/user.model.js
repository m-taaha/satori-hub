import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      lowerCase: true,
      trim: true,
      index: true
    },
    email: {
      type: String,
      required: [true, `Please enter your email`],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, `Please enter your password`],
      trim: true
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);