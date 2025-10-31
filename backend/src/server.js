import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";


dotenv.config();


const app = express();

const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
    connectDB();
    
})