import { Router } from "express";
import { uploadResource } from "../controllers/resource.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const resourceRouter = Router();

resourceRouter.post("/upload", isAuthenticated ,uploadResource)


export default resourceRouter;