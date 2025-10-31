import mongoose from "mongoose";

export const connectDB =  async () => {
    try{
         await mongoose.connect(process.env.MONGO_URI);
         console.log(`MongoDB  connected Successfully`)
    }catch(error){
        console.log(`MongoDB connection Failed: `, error.message);
        process.exit(1); //exit the app if db not connected
    }
}