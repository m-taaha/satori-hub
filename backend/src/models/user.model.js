import mongoose from "mongoose";
import bcrypt from "bcryptjs"
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
    bookmarks: [{
      type: mongoose.Types.ObjectId,
      ref: "Resource"
    }] 
  },
  { timestamps: true }
);

//pre save hook for saving password
userSchema.pre("save", async function (next) {
  //calls this function only when the password is modified or created
  if(!this.isModified('password')) return next();


  const salt = await bcrypt.genSalt(10);
  this.password=await bcrypt.hash(this.password, salt);
  next();
})

//comparing password
userSchema.methods.matchPassword  = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}



export const User = mongoose.model("User", userSchema);