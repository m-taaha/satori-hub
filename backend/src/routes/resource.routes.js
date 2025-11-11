import { Router } from "express";
import { getAllResources, searchMyResources, uploadResource } from "../controllers/resource.controller.js";
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

//route to get resource based on search
resourceRouter.get("/my-resources/search", isAuthenticated, searchMyResources)



export default resourceRouter;