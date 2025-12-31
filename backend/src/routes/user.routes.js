import {Router} from "express";
import { getMe, loginUser, logOut, registerUser } from "../controllers/user.controller.js";
import { registerUserSchema, loginUserSchema } from "../validators/user.validator.js";
import validate from "../middlewares/validate.middleware.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";


const userRouter = Router();

userRouter.post("/register", validate(registerUserSchema),  registerUser)
userRouter.post("/login", validate(loginUserSchema), loginUser)
userRouter.post("/logout", logOut)

userRouter.get("/me", isAuthenticated,  getMe);


export default userRouter;