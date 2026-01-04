import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
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


//prevent user to from leaving multiple reviews  on the same resources
reviewSchema.index({user: 1, resource: 1}, {unique: true});

export const Review = mongoose.model("Review", reviewSchema);