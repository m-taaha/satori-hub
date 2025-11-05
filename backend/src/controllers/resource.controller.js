import { Resource } from "../models/resource.model.js"
export const uploadResource = async (req, res) => {
    try{

        const { 
            title, 
            description, 
            difficulty, 
            category, 
            thumbnailImage, 
            resourceType, 
            resourceLink
        } = req.body;

        const newResource = await Resource.create({
            title,
            description,
            difficulty,
            category,
            thumbnailImage,
            resourceType,
            resourceLink,
            author: req.user._id // user come from auth-middleware 
        })

        return res.status(201).json({
            message: "Resource Uploaded Successfully",
            resource: newResource
        })

    }catch(error){
        console.log(`Uploading Error:`, error.message)
        return res.status(500).json({
            message: `Server Error`
        })
    }
}

export const getAllResources = async (req, res) => {
    try{
        const resources = await Resource.find({author: req.user._id}).sort({createdAt: -1})
        return res.status(200).json({resources});
    }catch(error){
        console.log(`Getting All Resources Error:`, error.message);
        return res.status(500).json({
          message: `Server Error`,
        });
    }
}