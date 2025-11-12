
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

//search my own resources
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

//upadting the resources
export const updateResource = async (req, res) => {
    try{
        const {id} = req.params;
        const updates = req.body;

        //only update if the resource belong the logged in user
        const updated = await Resource.findOneAndUpdate(
            {_id: id, author: req.user._id},
            updates,
            {new: true}
        );

        if(!updated) {
            return res.status(404).json({
                message: "Resource not found found or unauthorized"
            })
        }

        return res.status(200).json({
            message: "Resource updated successfully",
            resource: updated
        });

    }catch(error){
        console.log("Update Error:", error.message);
        return res.status(500).json({
          message: `Server Error`,
        });
    }
}

//deleting resources 
export const deleteResource = async () => {
    try{
        const {id} = req.params;

        const resource = await Resource.findOneAndDelete({_id: id, author: req.user._id});

        if(!resource){
            return res.status(404).json({
                message: "Resource not Found"
            });
        }

        return res.status(200).json({
            message: "Resource Deleted successfully",
            deletedResource: id,
        })
    }catch(error){
          console.log("Delete Error:", error.message);
          return res.status(500).json({
            message: `Server Error`,
          });
    }
}