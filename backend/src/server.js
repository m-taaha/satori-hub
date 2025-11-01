import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.routes.js";


dotenv.config();


const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({ extended: true, limit: "16kb"}))


app.use("/api/v1", userRouter)

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
    connectDB();
    
})