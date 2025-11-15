import mongoose from "mongoose";
import { Resource } from "../models/resource.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"

//uploading resources
export const uploadResource = async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      category,
      resourceType,
      resourceLink,
    } = req.body;

    //handle the main resource (file or link)
    let resourceLinkForDb = "";

    if(resourceType === "file") {
      //it's a file upload check if the file exists
      const resourceFileLocalPath = req.files.resourceFile?.[0]?.path;

      if(!resourceFileLocalPath) {
        return res.status(400).json({message: "Resource file is required when type is file"});
      }

      //upload to cloudinary
      const resourceFileUpload = await uploadOnCloudinary(resourceFileLocalPath);
      if(!resourceFileUpload) {
        return res.status(500).json({message: "Failed to upload resource file"});
      }
      resourceLinkForDb = resourceFileUpload.url; //get the url 
    
    } else if(resourceType === 'link') {
      //it's a link check if the link is provided in the body
      if(!resourceLink) {
        return res.status(400).json({message: "Resource link is required when type is 'link'"});
      }
      resourceLinkForDb = resourceLink;
    }


    //handle the (optional) thumbnail
    let thumbnailLinkForDb = "";
    const thumbnailLocalPath = req.files?.thumbnailImage?.[0]?.path;

    if(thumbnailLocalPath) {
      const thumbnailUpload = await uploadOnCloudinary(thumbnailLocalPath);
      if(thumbnailUpload) {
        thumbnailLinkForDb = thumbnailUpload.url; //get thumbnail url 
      }
      //not implementing error for thumbnail upload fails as it's optional
    }

    //create the resource
    const newResource = await Resource.create({
      title,
      description,
      difficulty,
      category,
      thumbnailImage: thumbnailLinkForDb, //use the new cloudinary url
      resourceType,
      resourceLink: resourceLinkForDb, //use the new file url or the provided link
      author: req.user._id, // user come from auth-middleware
    });

    return res.status(201).json({
      message: "Resource Uploaded Successfully",
      resource: newResource,
    });
  } catch (error) {
    console.log(`Uploading Error:`, error.message);
    return res.status(500).json({
      message: `Server Error`,
    });
  }
};

//get all resources
export const getMyResources = async (req, res) => {
  try {
    const resources = await Resource.find({ author: req.user._id }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ resources });
  } catch (error) {
    console.log(`Getting All Resources Error:`, error.message);
    return res.status(500).json({
      message: `Server Error`,
    });
  }
};

//search my own resources
export const searchMyResources = async (req, res) => {
  try {
    const { search, category, difficulty, resourceType } = req.query;

    let filter = { author: req.user._id }; // only their own resources they'll get

    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (resourceType) filter.resourceType = resourceType;

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const resources = (await Resource.find(filter)).sort({ createdAt: -1 });
    return res.status(200).json({ resources });
  } catch (error) {
    console.log("Error in Seaching My Resources:", error.message);
    return res.status(500).json({
      message: `Server Error`,
    });
  }
};

//upadting the resources
export const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    //only update if the resource belong the logged in user
    const updated = await Resource.findOneAndUpdate(
      { _id: id, author: req.user._id },
      updates,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Resource not found found or unauthorized",
      });
    }

    return res.status(200).json({
      message: "Resource updated successfully",
      resource: updated,
    });
  } catch (error) {
    console.log("Update Error:", error.message);
    return res.status(500).json({
      message: `Server Error`,
    });
  }
};

//deleting resources
export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    const resource = await Resource.findOneAndDelete({
      _id: id,
      author: req.user._id,
    });

    if (!resource) {
      return res.status(404).json({
        message: "Resource not Found",
      });
    }

    return res.status(200).json({
      message: "Resource Deleted successfully",
      deletedResource: id,
    });
  } catch (error) {
    console.log("Delete Error:", error.message);
    return res.status(500).json({
      message: `Server Error`,
    });
  }
};

//public controllers
//to get all resources publically
export const getAllResources = async (req, res) => {
  try {
    const resources = (await Resource.find()).toSorted({createdAt: -1});

    if (!resources) {
      return res.status(404).json({
        message: "No Resources Found",
      });
    }

    return res.status(200).json({
      message: "Available Resources",
      resources: resources,
    });
  } catch (error) {
    console.log("get All Resources Error:", error.message);
    return res.status(500).json({
      message: `Server Error`,
    });
  }
};

//search resources
export const searchResources = async (req, res) => {
  try {
    const { search, category, difficulty, resourceType } = req.query;

    let filter = {}; 

    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (resourceType) filter.resourceType = resourceType;

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const resources = (await Resource.find(filter)).sort({ createdAt: -1 });
    return res.status(200).json({ resources });
  } catch (error) {
    console.log("Error in Seaching My Resources:", error.message);
    return res.status(500).json({
      message: `Server Error`,
    });
  }
};

//to get the single Resource Details (+) the caluclated average ratings

export const getSingleResource = async (req, res) => {
  try {
    const {id} = req.params;

    //we are using mongoDB aggregation pipeline for complex calculations (all these comments are for me to remember the mongoDB aggreagations)

    const resource =  await Resource.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) } //1. find the specific resources
      },
      {
        $lookup: {
          from: 'reviews', //2. go look in the review collection
          localField: "_id", //match resource _id...
          foreignField: "resource", // ...with reviews "resource" field 
          as: "reviews", //call the result reviews
        },
      },
      {
        $addFields: {
          averageRating: { $avg: "$reviews.rating"}, //3. calculate the average of ratings
          totalReviews: { $size: "$reviews"}, //4. count the total number of review
        },
      },
      {
        $project: {
          reviews: 0, //5. (optional) Don't send the full reviews arrays here (we have a separate route for that)
        },
      },
    ]);

    if(!resource || resource.length === 0){
      return res.status(404).json({message: "Resource not Found"});
    }

    //Aggregate returns an array, so we take the first item
    return res.status(200).json({ resource: resource[0] })

  } catch (error) {
    console.log("Error in getSingleResource:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}