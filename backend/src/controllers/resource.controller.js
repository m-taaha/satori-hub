import { file } from "zod";
import { Resource } from "../models/resource.model.js"

//uploading resources
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

//get all resources
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

export const searchMyResources = async (req, res) => {
    try{
        const {search, category, difficulty, resourceType} = req.query;

        let filter = {author: req.user._id}; // only their own resources they'll get
        
        if(category) filter.category = category;
        if(difficulty) filter.difficulty = difficulty;
        if(resourceType) filter.resourceType = resourceType;

        if(search){
            filter.$or = [
                {title: {$regex: search, $options: "i"}},
                {description: { $regex: search, $options: "i"}}
            ];
        }
        
        const resources = (await Resource.find(filter)).toSorted({createdAt: -1});
        return res.status(200).json({resources})


    } catch (error){
        console.log('Error in Seaching My Resources:', error.message);
        return res.status(500).json({
            message: `Server Error`,
        })
    }
}