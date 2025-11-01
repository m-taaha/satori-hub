import { User } from "../models/user.model";

export const registerUser = async (req, res) => {
    try{
        const {firstName, lastName, userName, email, password, confirmPassword} = req.body;
         //check existingUser 
         const ifUserExist = await User.findOne({email});
         if(ifUserExist){
            return res.status(401).json({message: `User already exist`, error})
         }

         const newUser = await User.create({
            firstName,
            lastName,
            userName, 
            email,
            password,
            confirmPassword,
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

}

export const logOut = async (req, res) => {
    
}