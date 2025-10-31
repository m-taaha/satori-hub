import mongoose, { mongo } from "mongoose";

const resourceSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, `Title field cannot be empty`],
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    difficulty:{
        enum: ["Hard", "Medium", "Easy"],
        required: true,
        trim: true
    },
    category:{
        type: String,
        required: true,
        trim: true
    },
    thumbnailImage: {
        type: String, //cloudinary url
    },
    resourceType: {
        type: String,
        enum: ["file", "link"],  
        required: true
    },
    resourceLink: {
        type: String, //cloudiary link
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }




}, {timestamps: true})

export const Resource = mongoose.model("Resource", resourceSchema)