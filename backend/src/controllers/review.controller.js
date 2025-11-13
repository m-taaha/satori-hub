import {Review} from "../models/review.model.js"

export const createReview = async (req, res) => {
    try{
         const {rating, comment } = req.body;
         const { resourceId } = req.params;

         const review = await Review.create({
          comment,
          rating,
          user: req.user._ud,
          resource: resourceId,
         });

         return res.status(201).json({
          message: "Review Added Successfully",
          review,
         });         
    } catch(error) {
         console.log("Create Review Error", error);
         return res.status(500).json({
           message: `Sever Error`,
         });
    }
}