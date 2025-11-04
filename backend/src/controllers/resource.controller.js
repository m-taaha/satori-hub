import { Resource } from "../models/resource.model.js"
export const uploadResource = async (req, res) => {
    try{

        const { title, description, difficulty, category, thumbnailImage, resourceType, resourceLink} = req.body;

        if(!title || !description || !difficulty || !category || !resourceType || !resourceLink ){
            return res.status(401).json({
               message: `Required fields cannot be empty`
            })
        }

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