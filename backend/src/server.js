import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import resourceRouter from "./routes/resource.routes.js";


dotenv.config();


const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({ extended: true, limit: "16kb"}))
app.use(cookieParser());


app.use("/api/v1/user", userRouter)
app.use("api/v1/resources", resourceRouter )

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
    connectDB();
    
})