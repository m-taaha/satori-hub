import { Router } from "express";
import { uploadResource } from "../controllers/resource.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { uploadResourceSchema } from "../validators/resource.validator.js";
import validate from "../middlewares/validate.middleware.js";

const resourceRouter = Router();

resourceRouter.post("/upload", 
    isAuthenticated, 
    validate(uploadResourceSchema) ,uploadResource)


export default resourceRouter;