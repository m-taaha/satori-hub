import { Router } from "express";
import { getAllResources, uploadResource } from "../controllers/resource.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { uploadResourceSchema } from "../validators/resource.validator.js";
import validate from "../middlewares/validate.middleware.js";

const resourceRouter = Router();

//route to upload
resourceRouter.post("/upload", 
    isAuthenticated, 
    validate(uploadResourceSchema) ,uploadResource);

//route to get your own all resources
    resourceRouter.get("/my-resources", isAuthenticated,  getAllResources);


export default resourceRouter;