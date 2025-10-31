import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
    }, 
    comment: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, //user field that reference to the user filed
        ref: "User",
        required: true,
    },
    resource: {
        type: mongoose.Schema.Types.ObjectId, //reference field that reference to the resouce field
        ref: "Resource",
        required: true,
    }
},{timestamps: true})

export const Review = mongoose.model("Review", reviewSchema);