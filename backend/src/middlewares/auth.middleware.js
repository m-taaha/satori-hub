import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

export const isAuthenticated = async (req, res, next) => {
    try{
      const token = req.cookies.userToken;
      if (!token) {
        return res.status(401).json({ message: `Not authorized, no token ` })
      }

      //sign in using jwt verification
        const decoded = jwt.verify(token, process.env.JWT_USER_KEY);
        if (!decoded) {
          return res
            .status(401)
            .json({ message: `Not authorrized, token failed` });
        }

      //find the user by id from the token payload and remove the password field

      const user = await User.findById(decoded.userId).select("-password");
      // Attach the user object to the request
      req.user = user;
      next();
    }catch(error){
        console.log(`Authorization Failed:`, error) 
        return res.status(401).json({ message: "Not authorized, token failed" })
    }
}