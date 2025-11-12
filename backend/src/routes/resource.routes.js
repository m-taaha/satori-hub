import { Router } from "express";
import { deleteResource, getAllResources, getMyResources, searchMyResources, searchResources, updateResource, uploadResource } from "../controllers/resource.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { uploadResourceSchema } from "../validators/resource.validator.js";
import validate from "../middlewares/validate.middleware.js";

const resourceRouter = Router();

//route to upload
resourceRouter.post("/upload", 
    isAuthenticated, 
    validate(uploadResourceSchema) ,uploadResource);

//route to get your own all resources
resourceRouter.get("/my-resources", isAuthenticated,  getMyResources);

//route to get resource based on search
resourceRouter.get("/my-resources/search", isAuthenticated, searchMyResources);

//route to update your resources
resourceRouter.put("/update/:id", isAuthenticated, updateResource);

//route to delete your resouces
resourceRouter.delete("/delete/:id", isAuthenticated, deleteResource);


// routes for public use for all users

// route to get all resources
resourceRouter.get('/resources', getAllResources)

//route to get search resources
resourceRouter.get('/resources/search', searchResources)



export default resourceRouter;