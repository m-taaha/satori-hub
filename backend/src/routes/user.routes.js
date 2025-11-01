import {Router} from "express";
import { loginUser, logOut, registerUser } from "../controllers/user.controller.js";
import { registerUserSchema, loginUserSchema } from "../validators/user.validator.js";
import validate from "../middlewares/validate.middleware.js";


const userRouter = Router();

userRouter.post("/register", validate(registerUserSchema),  registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/logout", logOut)


export default userRouter;