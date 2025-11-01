import express from "express";
import { loginUser, logOut, registerUser } from "../controllers/user.controller.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/logout", logOut)


export default userRouter;