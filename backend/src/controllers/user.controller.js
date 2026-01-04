import { success } from "zod";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try{
        const {firstName, lastName, userName, email, password} = req.body;
         //check existingUser 
         const ifUserExist = await User.findOne({email});
         if(ifUserExist){
            return res.status(409).json({message: `User already exist`})
         }

         const newUser = await User.create({
            firstName,
            lastName,
            userName, 
            email,
            password,
         })

         return res.status(201).json({
            message: `User Created Successfully`,
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                userName: newUser.userName,
                email: newUser.email,
                createdAt: newUser.createdAt,
            }
         })
    }catch(error){
        console.log(`Error in registering User:`, error)
        return res.status(500).json({
            message: `Sever Error`
        })
    }
 }

export const loginUser = async (req, res) => {
    try{
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      //check if user exists
      if (!user) {
        return res.status(401).json({
          message: `Invlaid Credentials: User does not exist`,
        });
      }

      //check if password matches

      const isMatch = await user.matchPassword(password);

      if(!isMatch) {
        return res.status(401).json({
          message: `Invalid Credentials`,
        });
      }

      //generate jwt user token key and send it back
      const userToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_USER_KEY,
        {
          expiresIn: process.env.EXPIRES_IN,
        }
      );

      //set userToken in httpOnly cookies
      res.cookie("userToken", userToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, //7days
      });

      return res.status(200).json({
        message: "User Logged In Successfully",
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
        },
      });
    }catch(error){
          console.log(`Error in Login User:`, error);
          return res.status(500).json({
            message: `Sever Error`,
          });
    }
}

export const logOut = async (req, res) => {
  //to logout we will set the token to null and clear it's value
  //set the expiration date to a time in the past

  try {
    res.clearCookie("userToken", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export const getMe = async (req, res) => {
  try{
    const user = await User.findById(req.user._id).select("-password")
    return res.status(200).json({
      success: true,
      user
    });
  }catch(error){
    console.log("Error in getMe:", error);
    return res.status(500).json({
      message: "Server Error"
    });
  }
}