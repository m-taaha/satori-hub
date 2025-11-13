import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5
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