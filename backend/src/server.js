import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import resourceRouter from "./routes/resource.routes.js";
import reviewRouter from "./routes/review.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
   
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/resources", resourceRouter);
app.use("/api/v1/reviews", reviewRouter);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
  connectDB();
});
